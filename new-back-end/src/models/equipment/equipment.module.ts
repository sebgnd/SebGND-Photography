import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentService } from './equipment.service';
import { Equipment } from './equipment.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Equipment])],
	controllers: [],
	providers: [EquipmentService],
	exports: [EquipmentService],
})
export class EquipmentModule {}
