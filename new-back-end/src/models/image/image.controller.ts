import {
	Controller,
	Get,
	Body,
	Param,
	Post,
	Query,
	Delete,
	UploadedFile,
	UseInterceptors,
	BadRequestException,
	ForbiddenException,
	NotFoundException,
	HttpStatus,
	HttpCode,
} from '@nestjs/common';
import {
	ApiTags,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiForbiddenResponse,
} from '@nestjs/swagger';

import { PaginationResponse, PaginationDto } from '@common/helpers/pagination';

import { Image } from './image.entity';
import { ImageService } from './image.service';
import { AdjacentsResponse, AdjacentsQueryParams } from './image.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('images')
@Controller('images')
export class ImageController {
	constructor(private imageService: ImageService) {}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Return a single image',
	})
	@ApiNotFoundResponse({
		description: 'Could not find the requested image',
	})
	async get(@Param('id') id: string): Promise<Image> {
		const image = await this.imageService.get(id);

		if (!image) {
			throw new NotFoundException();
		}

		return image;
	}

	@Get(':id/adjacents')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Return the next and previous id from the current id image',
	})
	@ApiNotFoundResponse({
		description: 'Could not find the adjacent images from the request image',
	})
	async getAdjacents(
		@Param('id') id: string,
		@Query() { sameCategory = false }: AdjacentsQueryParams
	): Promise<AdjacentsResponse> {
		const image = await this.imageService.get(id);

		if (!image) {
			throw new NotFoundException();
		}

		const { next, previous } = await this.imageService.getAdjacentsFrom(image, sameCategory);

		return {
			nextId: next ? next.id : null,
			previousId: previous ? previous.id : null,
		};
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseInterceptors(FileInterceptor('image'))
	@ApiCreatedResponse({
		description: 'The image has been created and uploaded',
	})
	@ApiBadRequestResponse({
		description: 'The uploaded file is not an image',
	})
	async createImage(
		@UploadedFile() file: Express.Multer.File,
		@Body('categoryId') categoryId: string
	): Promise<Image> {
		if (file.mimetype.split('/')[0] !== 'image') {
			throw new BadRequestException();
		}

		const exif = await this.imageService.readExifData(file);
		const createdImage = await this.imageService.create(categoryId, exif);

		const buffersMap = await this.imageService.createFormatsForWeb(file);

		Object.keys(buffersMap).forEach((folder) => {
			this.imageService.saveFile(
				buffersMap[folder],
				folder,
				createdImage.id,
				createdImage.category.name
			);
		});

		return createdImage;
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Get a list of paginated images',
	})
	async getAllPaginated(@Param() pagination: PaginationDto): Promise<PaginationResponse<Image>> {
		const { page, itemsPerPage } = pagination;
		const images = await this.imageService.getPaginated(page, itemsPerPage);
		const count = await this.imageService.getTotalCount();

		return {
			items: images,
			page: page,
			total: count,
		};
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'The image has been deleted',
	})
	@ApiForbiddenResponse({
		description: 'Cannot delete a thumbnail image',
	})
	@ApiNotFoundResponse({
		description: 'The image does not exist',
	})
	async delete(@Param('id') id: string): Promise<Image> {
		const deletedImage = await this.imageService.get(id);

		if (!deletedImage) {
			throw new NotFoundException();
		}

		if (deletedImage.isCategoryThumbnail) {
			throw new ForbiddenException('Cannot delete an image that is a thumbnail');
		}

		// await this.imageService.delete(id);
		await this.imageService.deleteFiles(id, deletedImage.category.name);

		return deletedImage;
	}
}
