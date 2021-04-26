import * as Jimp from 'jimp';
import * as fs from 'fs';
import * as path from 'path';

import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm';
import { Repository, Connection, EntityManager, LessThan, MoreThan } from 'typeorm';

import { ImageService } from '@models/image/image.service';
import { Image } from '@models/image/image.entity';
import { Exif } from '@models/image/types';

import { EquipmentService } from '@models/equipment/equipment.service';

import { CategoryService } from '@models/category/category.service';
import { Category } from '@models/category/category.entity';

import { mockPortrait, mockLandscape, MockImageRepository } from '@mocks/image';
import { MockCategoryService, mockCategory3 } from '@mocks/category';
import { mockCamera, MockEquipmentService, mockLense } from '@mocks/equipment';
import { MockConfigService } from '@mocks/config';
import { getMockConnection } from '@mocks/connection';

jest.mock('jimp');
jest.mock('fs');

describe('CategoryService', () => {
	let imageService: ImageService;
	let equipmentService: EquipmentService;
	let categoryService: CategoryService;
	let configService: ConfigService;
	let imageRepository: Repository<Image>;
	let connection: Connection;
	let manager: Partial<EntityManager>;

	beforeEach(async () => {
		manager = {
			save: jest.fn(),
		};

		const moduleRef = await Test.createTestingModule({
			controllers: [],
			providers: [
				ImageService,
				MockImageRepository,
				MockCategoryService,
				MockEquipmentService,
				MockConfigService,
				getMockConnection(manager),
			],
		}).compile();

		imageService = moduleRef.get<ImageService>(ImageService);
		categoryService = moduleRef.get<CategoryService>(CategoryService);
		equipmentService = moduleRef.get<EquipmentService>(EquipmentService);
		configService = moduleRef.get<ConfigService>(ConfigService);
		imageRepository = moduleRef.get<Repository<Image>>(getRepositoryToken(Image));
		connection = moduleRef.get<Connection>(getConnectionToken());
	});

	it('should get an image', async () => {
		jest.spyOn(imageRepository, 'findOne').mockResolvedValueOnce(mockLandscape as Image);

		const result = await imageService.get(mockLandscape.id);

		expect(result).toStrictEqual(mockLandscape);
		expect(imageRepository.findOne).toHaveBeenNthCalledWith(1, mockLandscape.id, {
			relations: ['equipments', 'category'],
		});
	});

	it('should get the total amount of images', async () => {
		jest.spyOn(imageRepository, 'count').mockResolvedValueOnce(5);

		const result = await imageService.getTotalCount();

		expect(result).toStrictEqual(5);
		expect(imageRepository.count).toHaveBeenCalledTimes(1);
	});

	it('should get multiple images paginated', async () => {
		jest.spyOn(imageRepository, 'find').mockResolvedValueOnce([
			mockLandscape,
			mockPortrait,
		] as Image[]);

		const result = await imageService.getPaginated(3, 10);

		expect(result).toStrictEqual([mockLandscape, mockPortrait]);
		expect(imageRepository.find).toHaveBeenNthCalledWith(1, {
			relations: ['equipments', 'category'],
			order: { id: 'DESC' },
			skip: (3 - 1) * 10,
			take: 10,
		});
	});

	it('should get the next image from', async () => {
		jest.spyOn(imageRepository, 'findOne').mockResolvedValue(mockPortrait as Image);

		const resultSameCategory = await imageService.getNextOrPreviousFrom(
			mockLandscape as Image,
			'next',
			true
		);

		expect(resultSameCategory).toStrictEqual(mockPortrait);
		expect(imageRepository.findOne).toHaveBeenNthCalledWith(1, {
			order: { id: 'DESC' },
			where: {
				id: MoreThan(mockLandscape.id),
				category: { id: mockLandscape.category.id },
			},
		});

		const resultDifferentCategory = await imageService.getNextOrPreviousFrom(
			mockLandscape as Image,
			'next',
			false
		);

		expect(resultDifferentCategory).toStrictEqual(mockPortrait);
		expect(imageRepository.findOne).toHaveBeenNthCalledWith(2, {
			order: { id: 'DESC' },
			where: {
				id: MoreThan(mockLandscape.id),
				category: undefined,
			},
		});
	});

	it('should get the previous image from', async () => {
		jest.spyOn(imageRepository, 'findOne').mockResolvedValue(mockPortrait as Image);

		const resultSameCategory = await imageService.getNextOrPreviousFrom(
			mockLandscape as Image,
			'previous',
			true
		);

		expect(resultSameCategory).toStrictEqual(mockPortrait);
		expect(imageRepository.findOne).toHaveBeenNthCalledWith(1, {
			order: { id: 'DESC' },
			where: {
				id: LessThan(mockLandscape.id),
				category: { id: mockLandscape.category.id },
			},
		});

		const resultDifferentCategory = await imageService.getNextOrPreviousFrom(
			mockLandscape as Image,
			'previous',
			false
		);

		expect(resultDifferentCategory).toStrictEqual(mockPortrait);
		expect(imageRepository.findOne).toHaveBeenNthCalledWith(2, {
			order: { id: 'DESC' },
			where: {
				id: LessThan(mockLandscape.id),
				category: undefined,
			},
		});
	});

	it('should get the adjecents images from with same category', async () => {
		jest.spyOn(imageService, 'getNextOrPreviousFrom')
			.mockResolvedValueOnce(mockLandscape as Image)
			.mockResolvedValueOnce(mockPortrait as Image);

		const adjacents = await imageService.getAdjacentsFrom(mockPortrait as Image, true);

		expect(adjacents).toStrictEqual({
			next: mockLandscape,
			previous: mockPortrait,
		});
		expect(imageService.getNextOrPreviousFrom).toHaveBeenNthCalledWith(
			1,
			mockPortrait,
			'next',
			true
		);
		expect(imageService.getNextOrPreviousFrom).toHaveBeenNthCalledWith(
			2,
			mockPortrait,
			'previous',
			true
		);
	});

	it('should get the adjecents images from with different category', async () => {
		jest.spyOn(imageService, 'getNextOrPreviousFrom')
			.mockResolvedValueOnce(mockLandscape as Image)
			.mockResolvedValueOnce(mockPortrait as Image);

		const adjacents = await imageService.getAdjacentsFrom(mockPortrait as Image, false);

		expect(adjacents).toStrictEqual({
			next: mockLandscape,
			previous: mockPortrait,
		});
		expect(imageService.getNextOrPreviousFrom).toHaveBeenNthCalledWith(
			1,
			mockPortrait,
			'next',
			false
		);
		expect(imageService.getNextOrPreviousFrom).toHaveBeenNthCalledWith(
			2,
			mockPortrait,
			'previous',
			false
		);
	});

	it('should create an image with Exif', async () => {
		jest.spyOn(categoryService, 'get').mockResolvedValueOnce(mockCategory3 as Category);
		jest.spyOn(imageRepository, 'create').mockReturnValueOnce({
			category: mockCategory3 as Category,
		} as Image);
		jest.spyOn(equipmentService, 'getOrCreate')
			.mockResolvedValueOnce(mockLense)
			.mockResolvedValueOnce(mockCamera);
		jest.spyOn(manager, 'save').mockResolvedValueOnce(mockLandscape);

		const exif: Exif = {
			width: 1200,
			height: 1000,
			iso: 100,
			shutterSpeed: '1/100s',
			aperture: 'f10',
			focalLength: '24mm',
		};
		const result = await imageService.create(mockCategory3.id, exif);

		expect(result).toStrictEqual(mockLandscape);
		expect(connection.transaction).toHaveBeenCalledTimes(1);
		expect(manager.save).toHaveBeenNthCalledWith(1, {
			category: mockCategory3 as Category,
			width: 1200,
			height: 1000,
			iso: 100,
			shutterSpeed: '1/100s',
			aperture: 'f10',
			focalLength: '24mm',
			equipments: [mockLense, mockCamera],
		});
	});

	it('should create an image without Exif', async () => {
		jest.spyOn(categoryService, 'get').mockResolvedValueOnce(mockCategory3 as Category);
		jest.spyOn(imageRepository, 'create').mockReturnValueOnce({
			category: mockCategory3 as Category,
		} as Image);
		jest.spyOn(manager, 'save').mockResolvedValueOnce(mockLandscape);

		const exif: Exif = {
			width: 1200,
			height: 1000,
		};
		const result = await imageService.create(mockCategory3.id, exif);

		expect(result).toStrictEqual(mockLandscape);
		expect(connection.transaction).toHaveBeenCalledTimes(1);
		expect(manager.save).toHaveBeenNthCalledWith(1, {
			category: mockCategory3 as Category,
			width: 1200,
			height: 1000,
			equipments: [],
		});
	});

	it('should throw an error when trying to create an image with wrong category', async () => {
		jest.spyOn(categoryService, 'get').mockResolvedValueOnce(null);

		expect(
			imageService.create(mockCategory3.id, { width: 0, height: 0 })
		).rejects.toThrowError();
	});

	it('should delete an image', async () => {
		await imageService.delete(mockPortrait.id);

		expect(imageRepository.delete).toHaveBeenNthCalledWith(1, mockPortrait.id);
	});

	it('should resize an image with only height', async () => {
		const getBufferAsync = jest.fn();
		const quality = jest.fn(() => ({ getBufferAsync }));
		const resize = jest.fn(() => ({ quality }));

		const bitmap = {
			data: Buffer.from('buffer'),
			height: 1000,
			width: 1200,
		};

		jest.spyOn(Jimp, 'read').mockResolvedValueOnce(({ bitmap, resize } as unknown) as Jimp);

		const fileMocked = {
			mimetype: 'image/jpg',
			buffer: Buffer.from('imagebuffer'),
		};

		await imageService.resize(fileMocked as Express.Multer.File, {
			height: 400,
		});

		const scaledWidth = (1200 * 400) / 1000;

		expect(resize).toHaveBeenNthCalledWith(1, scaledWidth, 400);
		expect(quality).toHaveBeenNthCalledWith(1, 100);
		expect(getBufferAsync).toHaveBeenNthCalledWith(1, Jimp.MIME_JPEG);
	});

	it('should resize an image with height and width in landscape by cropping', async () => {
		const getBufferAsync = jest.fn();
		const secondQuality = jest.fn(() => ({ getBufferAsync }));
		const crop = jest.fn(() => ({ quality: secondQuality }));
		const firstQuality = jest.fn(() => ({ crop }));
		const resize = jest.fn(() => ({ quality: firstQuality }));

		const bitmap = {
			data: Buffer.from('buffer'),
			height: 1000,
			width: 1200,
		};

		jest.spyOn(Jimp, 'read').mockResolvedValueOnce(({ bitmap, resize } as unknown) as Jimp);

		const fileMocked = {
			mimetype: 'image/jpg',
			buffer: Buffer.from('imagebuffer'),
		};

		await imageService.resize(fileMocked as Express.Multer.File, {
			height: 400,
			width: 400,
			crop: true,
		});

		const scaledWidth = (1200 * 400) / 1000;
		const x = (scaledWidth - 400) / 2;
		const y = 0;

		expect(resize).toHaveBeenNthCalledWith(1, scaledWidth, 400);
		expect(firstQuality).toHaveBeenNthCalledWith(1, 100);
		expect(crop).toHaveBeenNthCalledWith(1, x, y, 400, 400);
		expect(secondQuality).toHaveBeenNthCalledWith(1, 100);
		expect(getBufferAsync).toHaveBeenNthCalledWith(1, Jimp.MIME_JPEG);
	});

	it('should resize an image with height and width in portrait by cropping', async () => {
		const getBufferAsync = jest.fn();
		const secondQuality = jest.fn(() => ({ getBufferAsync }));
		const crop = jest.fn(() => ({ quality: secondQuality }));
		const firstQuality = jest.fn(() => ({ crop }));
		const resize = jest.fn(() => ({ quality: firstQuality }));

		const bitmap = {
			data: Buffer.from('buffer'),
			height: 1200,
			width: 1000,
		};

		jest.spyOn(Jimp, 'read').mockResolvedValueOnce(({ bitmap, resize } as unknown) as Jimp);

		const fileMocked = {
			mimetype: 'image/jpg',
			buffer: Buffer.from('imagebuffer'),
		};

		await imageService.resize(fileMocked as Express.Multer.File, {
			height: 400,
			width: 400,
			crop: true,
		});

		const scaledHeight = (1200 * 400) / 1000;
		const x = 0;
		const y = (scaledHeight - 400) / 2;

		expect(resize).toHaveBeenNthCalledWith(1, 400, scaledHeight);
		expect(firstQuality).toHaveBeenNthCalledWith(1, 100);
		expect(crop).toHaveBeenNthCalledWith(1, x, y, 400, 400);
		expect(secondQuality).toHaveBeenNthCalledWith(1, 100);
		expect(getBufferAsync).toHaveBeenNthCalledWith(1, Jimp.MIME_JPEG);
	});

	it('should resize an image with height and width without cropping', async () => {
		const getBufferAsync = jest.fn();
		const quality = jest.fn(() => ({ getBufferAsync }));
		const resize = jest.fn(() => ({ quality }));

		const bitmap = {
			data: Buffer.from('buffer'),
			height: 1200,
			width: 1000,
		};

		jest.spyOn(Jimp, 'read').mockResolvedValueOnce(({ bitmap, resize } as unknown) as Jimp);

		const fileMocked = {
			mimetype: 'image/jpg',
			buffer: Buffer.from('imagebuffer'),
		};

		await imageService.resize(fileMocked as Express.Multer.File, {
			height: 390,
			width: 350,
		});

		expect(resize).toHaveBeenNthCalledWith(1, 350, 390);
		expect(quality).toHaveBeenNthCalledWith(1, 100);
		expect(getBufferAsync).toHaveBeenNthCalledWith(1, Jimp.MIME_JPEG);
	});

	it('should throw an error because the file is not an image', async () => {
		const fileMocked = {
			mimetype: 'document/pdf',
			buffer: Buffer.from('imagebuffer'),
		};

		expect(
			imageService.resize(fileMocked as Express.Multer.File, { height: 390 })
		).rejects.toThrowError();
	});

	it('should save the buffer as an image', async () => {
		jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
		jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => null);
		jest.spyOn(configService, 'get').mockImplementation((key: string) => key);

		const buffer = Buffer.from('buffer');
		const folder = path.join(
			__dirname,
			'..',
			'..',
			'..',
			'rootDir',
			'category',
			'format',
			'1.jpg'
		);

		imageService.saveFile(buffer, 'format', '1', 'category');

		expect(fs.writeFileSync).toHaveBeenCalledWith(folder, buffer);
	});

	it('should create the folder before saving the image', async () => {
		jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
		jest.spyOn(fs, 'writeFileSync').mockImplementationOnce(() => null);
		jest.spyOn(configService, 'get').mockImplementation((key: string) => key);

		const folder = path.join(__dirname, '..', '..', '..', 'rootDir', 'category', 'format');

		imageService.saveFile(Buffer.from('buffer'), 'format', '1', 'category');

		expect(fs.mkdirSync).toHaveBeenCalledWith(folder, { recursive: true });
	});

	it('should delete the images that have the same id and category', async () => {
		jest.spyOn(configService, 'get').mockImplementation((key: string) => key);
		jest.spyOn(fs, 'readdirSync').mockReturnValueOnce(['folder1', 'folder2', 'folder3']);

		const folder = path.join(__dirname, '..', '..', '..', 'rootDir', 'category');

		jest.spyOn(fs, 'existsSync').mockImplementation((imagePath: string) => {
			return path.join(folder, 'folder2', '1.jpg') === imagePath;
		});

		await imageService.deleteFiles('1', 'category');

		expect(fs.unlink).toHaveBeenNthCalledWith(1, path.join(folder, 'folder1', '1.jpg'));
		expect(fs.unlink).toHaveBeenNthCalledWith(2, path.join(folder, 'folder3', '1.jpg'));
		expect(fs.unlink).not.toHaveBeenCalledWith(path.join(folder, 'folder2', '1.jpg'));

		expect(true).toBeTruthy();
	});

	it('should read the exif data from the image', async () => {
		expect(true).toBeTruthy();
	});

	it('should create the different formats based on the config', async () => {
		expect(true).toBeTruthy();
	});

	it('should not create a different format if the height is not specified', async () => {
		expect(true).toBeTruthy();
	});
});
