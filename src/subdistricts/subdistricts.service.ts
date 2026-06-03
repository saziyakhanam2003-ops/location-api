import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subdistrict } from './entities/subdistrict.entity';


@Injectable()
export class SubdistrictsService {
  constructor(
    @InjectRepository(Subdistrict)
    private subdistrictRepository: Repository<Subdistrict>,
  ) {}

  findAll(districtId?: number) {

  if (districtId) {
    return this.subdistrictRepository.find({
      where: {
        district: {
          id: Number(districtId),
        },
      },
      relations: {
        district: true,
        villages: true,
      },
    });
  }

  return this.subdistrictRepository.find({
    relations: {
      district: true,
      villages: true,
    },
  });
}

  findOne(id: number) {
    return this.subdistrictRepository.findOne({
      where: { id },
    });
  }

  async create(data: any) {

  const district = await this.subdistrictRepository.manager.findOne(
    'District',
    {
      where: {
        id: data.districtId,
      },
    },
  );

  if (!district) {
    throw new NotFoundException('District not found');
  }

  const subdistrict = this.subdistrictRepository.create({
    name: data.name,
    district: {
      id: data.districtId,
    } as any,
  });

  return this.subdistrictRepository.save(subdistrict);
}
  update(id: number, data: Partial<Subdistrict>) {
    return this.subdistrictRepository.update(id, data);
  }

  remove(id: number) {
    return this.subdistrictRepository.delete(id);
  }
}