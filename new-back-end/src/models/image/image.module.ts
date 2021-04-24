import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '@models/category/category.module';
import { EquipmentModule } from '../equipment/equipment.module';

import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image } from './image.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Image]), CategoryModule, EquipmentModule, ConfigModule],
	controllers: [ImageController],
	providers: [ImageService],
})
export class ImageModule {}
