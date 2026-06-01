import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Village } from './entities/village.entity';
import { Subdistrict } from '../subdistricts/entities/subdistrict.entity';

import { VillagesController } from './villages.controller';
import { VillagesService } from './villages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Village,
      Subdistrict,
    ]),
  ],
  controllers: [VillagesController],
  providers: [VillagesService],
})
export class VillagesModule {}