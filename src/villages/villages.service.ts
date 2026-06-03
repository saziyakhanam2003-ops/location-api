import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Village } from './entities/village.entity';
import { Subdistrict } from '../subdistricts/entities/subdistrict.entity';

@Injectable()
export class VillagesService {
  constructor(
    @InjectRepository(Village)
    private villageRepository: Repository<Village>,

    @InjectRepository(Subdistrict)
    private subdistrictRepository: Repository<Subdistrict>,
  ) {}

  findAll(subdistrictId?: number) {

  if (subdistrictId) {
    return this.villageRepository.find({
      where: {
        subdistrict: {
          id: Number(subdistrictId),
        },
      },
      relations: {
        subdistrict: true,
      },
    });
  }

  return this.villageRepository.find({
    relations: {
      subdistrict: true,
    },
  });
}

  findOne(id: number) {
    return this.villageRepository.findOne({
      where: { id },
      relations: {
        subdistrict: true,
      },
    });
  }

  async create(data: any) {
    const subdistrict = await this.subdistrictRepository.findOne({
      where: {
        id: data.subdistrictId,
      },
    });

    if (!subdistrict) {
      throw new NotFoundException('Subdistrict not found');
    }

    const village = this.villageRepository.create({
      name: data.name,
      subdistrict: subdistrict,
    });

    return this.villageRepository.save(village);
  }

  async update(id: number, data: any) {
    await this.villageRepository.update(id, data);

    return this.villageRepository.findOne({
      where: { id },
      relations: {
        subdistrict: true,
      },
    });
  }

  remove(id: number) {
    return this.villageRepository.delete(id);
  }
}