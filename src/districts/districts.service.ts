import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { District } from './entities/district.entity';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  findAll() {
    return this.districtRepository.find();
  }

  findOne(id: number) {
    return this.districtRepository.findOne({
      where: { id },
    });
  }

  create(data: Partial<District>) {
    return this.districtRepository.save(data);
  }

  update(id: number, data: Partial<District>) {
    return this.districtRepository.update(id, data);
  }

  remove(id: number) {
    return this.districtRepository.delete(id);
  }
}