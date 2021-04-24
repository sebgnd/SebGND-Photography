import { Equipment } from '@models/equipment/equipment.entity';
import { EquipmentService } from '@models/equipment/equipment.service';
import { Provider } from '@nestjs/common';
import { getMockRepository } from './repository';

export const mockLense: Equipment = {
	id: '1',
	name: 'Sigma 18-35 f1.8',
	displayName: 'Sigma 18-35 f1.8',
	type: 'lense',
	createdAt: new Date(),
	updatedAt: new Date(),
	images: [],
};

export const mockCamera: Equipment = {
	id: '2',
	name: 'Canon 70D',
	displayName: 'Canon 70D',
	type: 'camera',
	createdAt: new Date(),
	updatedAt: new Date(),
	images: [],
};

export const mockCategoryServiceFactory = () => ({
	create: jest.fn(() => null),
});

export const MockEquipmentService: Provider = {
	provide: EquipmentService,
	useFactory: mockCategoryServiceFactory,
};

export const MockEquipmentRepository: Provider = getMockRepository(Equipment);
