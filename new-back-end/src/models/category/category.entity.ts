import { Entity, Column, OneToMany } from 'typeorm';
import { Table } from '@common/helpers/typeorm';

import { Image } from '@models/image/image.entity';

@Entity()
export class Category extends Table {
	@Column({ unique: true })
	name: string;

	@Column()
	displayName: string;

	@OneToMany(() => Image, (image) => image.category)
	images: Image[];
}
