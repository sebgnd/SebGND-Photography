import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Equipment, EquipmentType } from './equipment.entity';

@Injectable()
export class EquipmentService {
	constructor(
		@InjectRepository(Equipment)
		private equipmentRepository: Repository<Equipment>,

		@InjectConnection()
		private connection: Connection
	) {}

	async getByName(name: string): Promise<Equipment | undefined> {
		return await this.equipmentRepository.findOne({
			name,
		});
	}

	async create(name: string, type: EquipmentType): Promise<Equipment> {
		// When inserted, it will have the same name and display name
		// the name property is the string from the exif data
		const camera = this.equipmentRepository.create({
			displayName: name,
			name,
			type,
		});
		return await this.connection.transaction(async (manager) => {
			return await manager.save(camera);
		});
	}

	async getOrCreate(name: string, type: EquipmentType): Promise<Equipment> {
		const equipment = this.getByName(name);

		if (equipment) {
			return equipment;
		}

		return await this.create(name, type);
	}
}
