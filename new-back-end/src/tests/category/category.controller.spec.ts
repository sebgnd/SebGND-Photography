import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { CategoryController, CategoryService } from '@models/category';

import {
	mockCategory1,
	mockCategory2,
	MockCategoryService,
} from '@mocks/category';

describe('CategoryController', () => {
	let categoryService: CategoryService;
	let categoryController: CategoryController;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [MockCategoryService],
		}).compile();

		categoryController = moduleRef.get<CategoryController>(
			CategoryController
		);
		categoryService = moduleRef.get<CategoryService>(CategoryService);
	});

	it('should return the category', async () => {
		jest.spyOn(categoryService, 'get').mockResolvedValueOnce(mockCategory1);

		const result = await categoryController.get('id');

		expect(result).toStrictEqual(mockCategory1);
	});

	it('should whould throw a 404', async () => {
		jest.spyOn(categoryService, 'get').mockResolvedValueOnce(null);

		try {
			await categoryController.get('id');
		} catch (err) {
			expect(err.status).toStrictEqual(404);
			expect(err).toStrictEqual(new NotFoundException());
		}
	});

	it('should not find the category', async () => {
		const mockCategories = [mockCategory1, mockCategory2, mockCategory1];

		jest.spyOn(categoryService, 'getAll').mockResolvedValueOnce(
			mockCategories
		);

		const categories = await categoryController.getAll();

		expect(categories).toStrictEqual(mockCategories);
	});

	it('should create a category', async () => {
		jest.spyOn(categoryService, 'create').mockResolvedValueOnce(
			mockCategory1
		);

		const result = await categoryController.post({ name: 'test' });

		expect(result).toStrictEqual(mockCategory1);
	});
});
