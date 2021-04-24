import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { CategoryModule } from '@models/category/category.module';
import { ImageModule } from '@models/image/image.module';
import { EquipmentModule } from '@models/equipment/equipment.module';

import imageConfiguration from '@configuration/image.configuration';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () => {
				return Object.assign(await getConnectionOptions(), {
					autoLoadEntities: true,
				});
			},
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [imageConfiguration],
		}),
		CategoryModule,
		ImageModule,
		EquipmentModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
