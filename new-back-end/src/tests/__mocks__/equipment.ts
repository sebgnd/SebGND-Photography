import { Equipment } from '@models/equipment/equipment.entity';
import { EquipmentService } from '@models/equipment/equipment.service';
import { Provider } from '@nestjs/common';
import { getMockRepository } from './repository';

export const mockLense: Equipment = {
	id: '77ae9b6f-ae74-4010-ac7e-98c0aef5ceb9',
	createdAt: new Date('2021-04-22T15:41:28.018Z'),
	updatedAt: new Date('2021-04-22T15:41:28.018Z'),
	name: '24-70mm F2.8 DG DN | Art 019',
	displayName: '24-70mm F2.8 DG DN | Art 019',
	type: 'lense',
	images: [],
};

export const mockCamera: Equipment = {
	id: 'da386350-e6f4-4032-9037-91b51cff0133',
	createdAt: new Date('2021-04-22T15:41:28.054Z'),
	updatedAt: new Date('2021-04-22T15:41:28.054Z'),
	name: 'SONY ILCE-7M3',
	displayName: 'SONY ILCE-7M3',
	type: 'camera',
	images: [],
};

export const mockEquipmentServiceFactory = () => ({
	create: jest.fn(() => null),
	getByName: jest.fn(() => null),
	getOrCreate: jest.fn(() => null),
});

export const MockEquipmentService: Provider = {
	provide: EquipmentService,
	useFactory: mockEquipmentServiceFactory,
};

export const MockEquipmentRepository: Provider = getMockRepository(Equipment);
