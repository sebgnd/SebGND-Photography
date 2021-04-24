import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Table } from '@common/helpers/typeorm';

import { Category } from '@models/category/category.entity';
import { Equipment } from '@models/equipment/equipment.entity';

@Entity()
export class Image extends Table {
	@Column({ nullable: true })
	iso: number;

	@Column({ nullable: true })
	shutterSpeed: string;

	@Column({ nullable: true })
	aperture: string;

	@Column({ nullable: true })
	focalLength: string;

	@Column()
	height: number;

	@Column()
	width: number;

	@Column({
		default: false,
	})
	isCategoryThumbnail: boolean;

	@ManyToMany(() => Equipment, (equipment) => equipment.images)
	@JoinTable()
	equipments: Equipment[];

	@ManyToOne(() => Category, (category) => category.images)
	category: Category;
}
