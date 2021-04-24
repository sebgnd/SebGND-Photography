import {
	Controller,
	Get,
	Param,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Body,
	Post,
} from '@nestjs/common';
import { ApiTags, ApiNotFoundResponse, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Return a single category',
	})
	@ApiNotFoundResponse({
		description: 'Could not find the requested category',
	})
	async get(@Param('id') id: string): Promise<Category> {
		const category = await this.categoryService.get(id);

		if (!category) {
			throw new NotFoundException();
		}

		return category;
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		description: 'Return every category',
	})
	async getAll(): Promise<Category[]> {
		const categories = await this.categoryService.getAll();

		return categories;
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({
		description: 'The category has been created',
	})
	async post(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
		const { name } = createCategoryDto;
		const category = await this.categoryService.create(name);

		return category;
	}
}
