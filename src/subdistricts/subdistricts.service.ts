import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subdistrict } from './entities/subdistrict.entity';

@Injectable()
export class SubdistrictsService {
  constructor(
    @InjectRepository(Subdistrict)
    private subdistrictRepository: Repository<Subdistrict>,
  ) {}

  findAll() {
    return this.subdistrictRepository.find();
  }

  findOne(id: number) {
    return this.subdistrictRepository.findOne({
      where: { id },
    });
  }

  create(data: Partial<Subdistrict>) {
    return this.subdistrictRepository.save(data);
  }

  update(id: number, data: Partial<Subdistrict>) {
    return this.subdistrictRepository.update(id, data);
  }

  remove(id: number) {
    return this.subdistrictRepository.delete(id);
  }
}