import * as Jimp from 'jimp';
import sizeOf from 'image-size';

import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository, LessThan, MoreThan, FindOneOptions } from 'typeorm';

import { CategoryService } from '../category/category.service';

import { ExifImage, ExifData } from 'exif';

import { Image } from './image.entity';
import { AdjacentImages, NextOrPrevious, Exif, ResizeOptions } from './types';

import { EquipmentService } from '../equipment/equipment.service';
import { Equipment } from '../equipment/equipment.entity';
import { Category } from '../category/category.entity';

import { FormatSizes, ImageFormat, FormatSizeOptions } from '@configuration/image.configuration';

const readExif = (buffer: Buffer) => {
	return new Promise<ExifData>((resolve, reject) => {
		new ExifImage(buffer, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
const unlink = util.promisify(fs.unlink);

@Injectable()
export class ImageService {
	constructor(
		@InjectRepository(Image)
		private imageRepository: Repository<Image>,

		@Inject(CategoryService)
		private categoryService: CategoryService,

		@Inject(EquipmentService)
		private equipmentService: EquipmentService,

		@Inject(ConfigService)
		private configService: ConfigService,

		@InjectConnection()
		private connection: Connection
	) {}

	async get(id: string): Promise<Image> {
		return await this.imageRepository.findOne(id, {
			relations: ['equipments', 'category'],
		});
	}

	async getTotalCount(): Promise<number> {
		return await this.imageRepository.count();
	}

	async getPaginated(page: number, itemsPerPage: number): Promise<Image[]> {
		const skip = (page - 1) * itemsPerPage;
		const take = itemsPerPage;

		const images = await this.imageRepository.find({
			relations: ['equipments', 'category'],
			order: { id: 'DESC' },
			skip,
			take,
		});

		return images;
	}

	async getNextOrPreviousFrom(
		image: Image,
		side: NextOrPrevious,
		sameCategory: boolean
	): Promise<Image | null> {
		const previous = side === 'previous';
		const { id } = image;
		const findOptions: FindOneOptions<Image> = {
			order: { id: 'DESC' },
			where: {
				id: previous ? LessThan(id) : MoreThan(id),
				category: !sameCategory ? undefined : { id: image.category.id },
			},
		};

		return this.imageRepository.findOne(findOptions);
	}

	async getAdjacentsFrom(image: Image, sameCategory: boolean): Promise<AdjacentImages> {
		const next = await this.getNextOrPreviousFrom(image, 'next', sameCategory);
		const previous = await this.getNextOrPreviousFrom(image, 'previous', sameCategory);

		return { next, previous };
	}

	async readExifData(file: Express.Multer.File): Promise<Exif> {
		const isImage = file.mimetype.split('/')[0] === 'image';

		if (!isImage) {
			throw new Error('The file must be an image in order to read the EXIF.');
		}

		const { height, width } = sizeOf(file.buffer);

		try {
			const data = await readExif(file.buffer);

			const camera = `${data.image['Make']} ${data.image['Model']}`;
			const roundedExposureTime = Math.round(data.exif['ExposureTime']);
			const exposureTimeInMs = 1 / data.exif['ExposureTime'];
			const needFraction = data.exif['ExposureTime'] < 1;
			const shutterSpeed = needFraction
				? `1/${exposureTimeInMs}s`
				: `${roundedExposureTime}s`;

			return {
				iso: data.exif['ISO'],
				focalLength: `${data.exif['FocalLength']}mm`,
				aperture: `f${data.exif['FNumber']}`,
				lense: data.exif['LensModel'],
				height,
				width,
				camera,
				shutterSpeed,
			};
		} catch (err) {
			return { width, height };
		}
	}

	async create(categoryId: string, exif: Exif): Promise<Image> {
		const category: Category = await this.categoryService.get(categoryId);

		if (!category) {
			throw new Error('Cannot create an image without a category');
		}

		const image = this.imageRepository.create({ category });

		// If we have the iso, we can assume that we have the rest of the EXIF datas
		if (exif.iso) {
			const { lense: exifLense, camera: exifCamera } = exif;
			const lense: Equipment = await this.equipmentService.getOrCreate(exifLense, 'lense');
			const camera: Equipment = await this.equipmentService.getOrCreate(exifCamera, 'camera');

			image.iso = exif.iso;
			image.shutterSpeed = exif.shutterSpeed;
			image.aperture = exif.aperture;
			image.focalLength = exif.focalLength;
			image.equipments = [lense, camera];
		} else {
			image.equipments = [];
		}

		image.height = exif.height;
		image.width = exif.width;

		const createdImage = await this.connection.transaction(async (manager) => {
			return await manager.save(image);
		});

		return createdImage;
	}

	async delete(imageId: string): Promise<void> {
		await this.imageRepository.delete(imageId);
	}

	async deleteFiles(imageId: string, categoryName: string): Promise<void> {
		const folder = this.configService.get<string>('rootDir');
		const categoryFolder = path.join(__dirname, '..', '..', '..', folder, categoryName);

		const directories = fs.readdirSync(categoryFolder);

		const promises = directories.map((dir: string) => {
			const imagePath = path.join(categoryFolder, dir, `${imageId}.jpg`);

			return fs.existsSync(imagePath) ? unlink(imagePath) : Promise.resolve();
		});

		await Promise.all(promises);
	}

	async createFormatsForWeb(file: Express.Multer.File) {
		const format = this.configService.get<ImageFormat>('format');
		const sizesOptions = Object.values(format).reduce(
			(options: FormatSizeOptions[], sizes: FormatSizes) => {
				return [...options, ...Object.values(sizes)];
			},
			[]
		);
		const promisesMap: Record<string, Promise<Buffer>> = sizesOptions.reduce(
			(acc, sizeOption) => {
				const { crop, width, height, folderName } = sizeOption;
				if (height) {
					return {
						...acc,
						[folderName]: this.resize(file, { crop, width, height }),
					};
				}
				return { ...acc, [folderName]: Promise.resolve(file.buffer) };
			},
			{}
		);

		const resultsMap = await Promise.resolve().then(async () => {
			const promises = Object.values(promisesMap);
			const results = await Promise.all(promises);

			return Promise.resolve(
				Object.keys(promisesMap).reduce((acc, folder, index) => {
					return {
						...acc,
						[folder]: results[index],
					};
				}, {})
			);
		});

		return resultsMap;
	}

	async resize(
		file: Express.Multer.File,
		{ width, height, crop }: ResizeOptions
	): Promise<Buffer> {
		const isImage = file.mimetype.split('/')[0] === 'image';

		if (!isImage) {
			throw new Error('Cannot resize a file that is not an image');
		}

		const image = await Jimp.read(file.buffer);
		const originalWidth = image.bitmap.width;
		const originalHeight = image.bitmap.height;

		const isLandscape = originalHeight < originalWidth;
		const scaledWidth = Math.round((height / originalHeight) * originalWidth);

		if (width) {
			if (!crop) {
				return image.resize(width, height).quality(100).getBufferAsync(Jimp.MIME_JPEG);
			}

			const scaledHeight = Math.round((width / originalWidth) * originalHeight);
			const resizedImage = isLandscape
				? image.resize(scaledWidth, height).quality(100)
				: image.resize(width, scaledHeight).quality(100);

			const x = isLandscape ? Math.round(scaledWidth / 2 - width / 2) : 0;
			const y = isLandscape ? 0 : Math.round(scaledHeight / 2 - height / 2);

			return resizedImage
				.crop(x, y, width, height)
				.quality(100)
				.getBufferAsync(Jimp.MIME_JPEG);
		}

		return image.resize(scaledWidth, height).quality(100).getBufferAsync(Jimp.MIME_JPEG);
	}

	saveFile(buffer: Buffer, format: string, imageId: string, categoryName: string): void {
		const folder = this.configService.get<string>('rootDir');

		const categoriesFolder = path.join(__dirname, '..', '..', '..', folder);
		const formatFolder = path.join(categoriesFolder, categoryName, format);
		const imagePath = path.join(formatFolder, `${imageId}.jpg`);

		if (!fs.existsSync(formatFolder)) {
			fs.mkdirSync(formatFolder, { recursive: true });
		}

		fs.writeFileSync(imagePath, buffer);
	}
}
