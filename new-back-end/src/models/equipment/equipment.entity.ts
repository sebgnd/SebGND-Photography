import { Entity, Column, ManyToMany } from 'typeorm';
import { Table } from '@common/helpers/typeorm';

import { Image } from '@models/image/image.entity';

const EQUIPMENT_TYPES = ['lense', 'camera'] as const;

export type EquipmentType = typeof EQUIPMENT_TYPES[number];

@Entity()
export class Equipment extends Table {
	@Column({ unique: true })
	name: string;

	@Column()
	displayName: string;

	@Column({
		type: 'enum',
		enum: EQUIPMENT_TYPES,
	})
	type: EquipmentType;

	@ManyToMany(() => Image, (image) => image.equipments)
	images: Image[];
}
