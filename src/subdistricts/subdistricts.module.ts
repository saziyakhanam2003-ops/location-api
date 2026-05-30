import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubdistrictsService } from './subdistricts.service';
import { SubdistrictsController } from './subdistricts.controller';
import { Subdistrict } from './entities/subdistrict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subdistrict])],
  controllers: [SubdistrictsController],
  providers: [SubdistrictsService],
})
export class SubdistrictsModule {}