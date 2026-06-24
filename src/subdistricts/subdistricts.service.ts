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

  async findAll(
  districtId?: number,
  page = 1,
  limit = 10,
  search?: string,
  sortBy = 'id',
  order: 'ASC' | 'DESC' = 'ASC',
) {
  const query = this.subdistrictRepository
    .createQueryBuilder('subdistrict')
    .leftJoinAndSelect('subdistrict.district', 'district');

  if (districtId) {
    query.andWhere(
      'district.id = :districtId',
      { districtId },
    );
  }

  if (search) {
    query.andWhere(
      'subdistrict.name LIKE :search',
      {
        search: '%'+ search +'%',
      },
    );
  }

  query.orderBy('subdistrict.name',order);

  query
    .skip((page - 1) * limit)
    .take(limit);

  const [data, total] = await query.getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
  };
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