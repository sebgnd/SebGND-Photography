import { Category } from '@models/category/category.entity';
import { CategoryService } from '@models/category/category.service';
import { Provider } from '@nestjs/common';
import { getMockRepository } from './repository';

export const mockCategory1: Category = {
	id: '1',
	name: 'photo_manipulation',
	displayName: 'Photo Manipulation',
	createdAt: new Date(),
	updatedAt: new Date(),
	images: [],
};

export const mockCategory2: Category = {
	id: '2',
	name: 'landscape',
	displayName: 'Landscape',
	createdAt: new Date(),
	updatedAt: new Date(),
	images: [],
};

export const mockCategory3: Partial<Category> = {
	id: '160a93d4-5ba1-4310-868a-1e471712ee59',
	createdAt: new Date('2021-04-24T16:14:29.123Z'),
	updatedAt: new Date('2021-04-24T16:14:29.123Z'),
	name: 'architecture',
	displayName: 'Architecture',
};

export const mockCategoryServiceFactory = () => ({
	get: jest.fn(() => null),
	getAll: jest.fn(() => null),
	create: jest.fn(() => null),
});

export const MockCategoryService: Provider = {
	provide: CategoryService,
	useFactory: mockCategoryServiceFactory,
};

export const MockCategoryRepository: Provider = getMockRepository(Category);
