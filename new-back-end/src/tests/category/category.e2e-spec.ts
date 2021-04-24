import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, NotFoundException } from '@nestjs/common';

import { CategoryService } from '@models/category/category.service';
import { CategoryModule } from '@models/category/category.module';
import { CreateCategoryDto } from '@models/category/category.dto';
import { Category } from '@models/category/category.entity';

import { mockCategoryServiceFactory, mockCategory1, mockCategory2 } from '@mocks/category';
import { mockRepositoryFactory } from '@mocks/repository';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Categories', () => {
	let app: INestApplication;
	let categoryService: CategoryService;

	beforeAll(async () => {
		const mockCategories = [mockCategory2, mockCategory1, mockCategory2];
		const moduleRef = await Test.createTestingModule({
			imports: [CategoryModule],
		})
			.overrideProvider(CategoryService)
			.useFactory({
				factory: mockCategoryServiceFactory,
			})
			.overrideProvider(getRepositoryToken(Category))
			.useFactory({
				factory: mockRepositoryFactory,
			})
			.compile();

		app = moduleRef.createNestApplication();
		categoryService = moduleRef.get<CategoryService>(CategoryService);

		jest.spyOn(categoryService, 'get').mockResolvedValue(mockCategory1);
		jest.spyOn(categoryService, 'getAll').mockResolvedValue(mockCategories);
		jest.spyOn(categoryService, 'create').mockResolvedValue(mockCategory2);

		await app.init();
	});

	it('/GET categories/:id', async () => {
		const category = await categoryService.get('0');
		const expectedResult = JSON.stringify(category);

		return request(app.getHttpServer())
			.get('/categories/0')
			.expect(HttpStatus.OK)
			.expect('Content-Type', /json/)
			.expect(expectedResult);
	});

	it('/GET categories/:id should return a 404', async () => {
		jest.spyOn(categoryService, 'get').mockResolvedValueOnce(null);

		const notFoundResponse = JSON.stringify(new NotFoundException().getResponse());

		return request(app.getHttpServer())
			.get('/categories/0')
			.expect(HttpStatus.NOT_FOUND)
			.expect('Content-Type', /json/)
			.expect(notFoundResponse);
	});

	it('/GET categories', async () => {
		const categories = await categoryService.getAll();
		const expectedResult = JSON.stringify(categories);

		return request(app.getHttpServer())
			.get('/categories')
			.expect(HttpStatus.OK)
			.expect('Content-Type', /json/)
			.expect(expectedResult);
	});

	it('/POST categories', async () => {
		const { name } = new CreateCategoryDto();
		const category = await categoryService.create(name);
		const expectedResult = JSON.stringify(category);

		return request(app.getHttpServer())
			.post('/categories')
			.send({ name })
			.expect(HttpStatus.CREATED)
			.expect('Content-Type', /json/)
			.expect(expectedResult);
	});

	afterAll(async () => {
		await app.close();
	});
});
