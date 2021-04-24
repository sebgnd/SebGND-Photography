import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Category } from './category.entity';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,

		@InjectConnection()
		private connection: Connection
	) {}

	async get(id: string): Promise<Category | null> {
		return await this.categoryRepository.findOne(id);
	}

	async getAll(): Promise<Category[]> {
		return await this.categoryRepository.find();
	}

	async create(name: string): Promise<Category> {
		const uniqueName = name.toLowerCase().replace(' ', '_');
		const category: Category = this.categoryRepository.create({
			displayName: name,
			name: uniqueName,
		});
		const createdCategory = await this.connection.transaction(async (manager) => {
			return await manager.save(category);
		});

		return createdCategory;
	}
}
