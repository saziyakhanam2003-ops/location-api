import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like,Repository } from 'typeorm';

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

  async findAll(
  subdistrictId?: number,
  page = 1,
  limit = 10,
  search?: string,
  sortBy = 'id',
  order: 'ASC' | 'DESC' = 'ASC',
) {
    const whereCondition: any = {};

    // Filter by subdistrict
    if (subdistrictId) {
      whereCondition.subdistrict = {
        id: Number(subdistrictId),
      };
    }

    // Search by village name
    if (search) {
      whereCondition.name = Like('%'+ search +'%');
     }

    const [data, total] =
      await this.villageRepository.findAndCount({
        where: whereCondition,
        relations: {
          subdistrict: true,
        },
        order:{
          [sortBy]:order,
        },
        skip: (page - 1) * limit,
        take: limit,
      });

    return {
      data,
      total,
      page,
      limit,
    };
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
      subdistrict,
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