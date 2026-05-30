import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Village } from './entities/village.entity';

@Injectable()
export class VillagesService {
  constructor(
    @InjectRepository(Village)
    private villageRepository: Repository<Village>,
  ) {}

  findAll() {
    return this.villageRepository.find();
  }

  findOne(id: number) {
    return this.villageRepository.findOne({
      where: { id },
    });
  }

  create(data: Partial<Village>) {
    return this.villageRepository.save(data);
  }

  update(id: number, data: Partial<Village>) {
    return this.villageRepository.update(id, data);
  }

  remove(id: number) {
    return this.villageRepository.delete(id);
  }
}