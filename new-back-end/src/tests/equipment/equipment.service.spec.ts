import { Test } from '@nestjs/testing';
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm';
import { Repository, Connection, EntityManager } from 'typeorm';

import { mockLense, mockCamera, MockEquipmentRepository } from '@mocks/equipment';
import { getMockConnection } from '@mocks/connection';

import { EquipmentService } from '@models/equipment/equipment.service';
import { Equipment } from '@models/equipment/equipment.entity';

describe('EquipmentService', () => {
	let equipmentService: EquipmentService;
	let equipmentRepository: Repository<Equipment>;
	let connection: Connection;
	let manager: Partial<EntityManager>;

	beforeEach(async () => {
		manager = {
			save: jest.fn(),
		};

		const moduleRef = await Test.createTestingModule({
			controllers: [],
			providers: [EquipmentService, MockEquipmentRepository, getMockConnection(manager)],
		}).compile();

		equipmentService = moduleRef.get<EquipmentService>(EquipmentService);
		equipmentRepository = moduleRef.get<Repository<Equipment>>(getRepositoryToken(Equipment));
		connection = moduleRef.get<Connection>(getConnectionToken());
	});

	it('should return an equipment by name', async () => {
		jest.spyOn(equipmentRepository, 'findOne').mockResolvedValueOnce(mockLense);

		const equipment = await equipmentService.getByName(mockLense.name);

		expect(equipmentRepository.findOne).toHaveBeenNthCalledWith(1, { name: equipment.name });
		expect(equipment).toStrictEqual(mockLense);
	});

	it('should create an equipment', async () => {
		jest.spyOn(equipmentRepository, 'create').mockReturnValueOnce(mockCamera);
		jest.spyOn(manager, 'save').mockResolvedValueOnce(mockCamera);

		const newEquipment = await equipmentService.create(mockCamera.name, mockCamera.type);

		expect(equipmentRepository.create).toHaveBeenNthCalledWith(1, {
			displayName: mockCamera.name,
			name: mockCamera.name,
			type: mockCamera.type,
		});
		expect(connection.transaction).toHaveBeenCalledTimes(1);
		expect(newEquipment).toStrictEqual(mockCamera);
	});

	it('should get an existing equipment when calling getOrCreate', async () => {
		jest.spyOn(equipmentRepository, 'findOne').mockResolvedValueOnce(mockLense);
		jest.spyOn(equipmentService, 'create').mockResolvedValueOnce(null);

		const equipment = await equipmentService.getOrCreate(mockLense.name, mockLense.type);

		expect(equipmentRepository.findOne).toHaveBeenNthCalledWith(1, { name: mockLense.name });
		expect(equipmentService.create).not.toHaveBeenCalled();
		expect(equipment).toStrictEqual(mockLense);
	});

	it('should create a new equipment when calling getOrCreate', async () => {
		jest.spyOn(equipmentService, 'getByName').mockResolvedValueOnce(null);
		jest.spyOn(equipmentService, 'create').mockResolvedValue(mockCamera);

		const equipment = await equipmentService.getOrCreate(mockCamera.name, mockCamera.type);

		expect(equipmentRepository.findOne).not.toHaveBeenCalled();
		expect(equipmentService.create).toHaveBeenNthCalledWith(
			1,
			mockCamera.name,
			mockCamera.type
		);
		expect(equipment).toStrictEqual(mockCamera);
	});
});
