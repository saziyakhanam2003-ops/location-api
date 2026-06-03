import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';
import { District } from './entities/district.entity';
import { State } from '../states/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    District,
    State,
  ])
],
  controllers: [DistrictsController],
  providers: [DistrictsService],
})
export class DistrictsModule {}