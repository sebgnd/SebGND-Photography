import { Test } from '@nestjs/testing';
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm';
import { Repository, Connection, EntityManager } from 'typeorm';

import { CategoryService } from '@models/category/category.service';
import { Category } from '@models/category/category.entity';

import { mockCategory1, mockCategory2, MockCategoryRepository } from '@mocks/category';
import { getMockConnection } from '@mocks/connection';

describe('CategoryService', () => {
	let categoryService: CategoryService;
	let categoryRepository: Repository<Category>;
	let connection: Connection;
	let manager: Partial<EntityManager>;

	beforeEach(async () => {
		manager = {
			save: jest.fn(),
		};

		const moduleRef = await Test.createTestingModule({
			controllers: [],
			providers: [CategoryService, MockCategoryRepository, getMockConnection(manager)],
		}).compile();

		categoryService = moduleRef.get<CategoryService>(CategoryService);
		categoryRepository = moduleRef.get<Repository<Category>>(getRepositoryToken(Category));
		connection = moduleRef.get<Connection>(getConnectionToken());
	});

	it('should return a category', async () => {
		jest.spyOn(categoryRepository, 'findOne').mockResolvedValueOnce(mockCategory1);

		const category = await categoryService.get('test');

		expect(categoryRepository.findOne).toHaveBeenCalledTimes(1);
		expect(category).toStrictEqual(mockCategory1);
	});

	it('should return every category', async () => {
		const mockCategories = [mockCategory2, mockCategory1, mockCategory1];

		jest.spyOn(categoryRepository, 'find').mockResolvedValueOnce(mockCategories);

		const categories = await categoryService.getAll();

		expect(categoryRepository.find).toHaveBeenCalledTimes(1);
		expect(categories).toStrictEqual(mockCategories);
	});

	it('should create a category', async () => {
		jest.spyOn(categoryRepository, 'create').mockReturnValueOnce(mockCategory1);

		await categoryService.create('Photo Manipulation');

		expect(categoryRepository.create).toHaveBeenLastCalledWith({
			name: 'photo_manipulation',
			displayName: 'Photo Manipulation',
		});
		expect(connection.transaction).toHaveBeenCalledTimes(1);
		expect(manager.save).toHaveBeenCalledTimes(1);
	});
});
