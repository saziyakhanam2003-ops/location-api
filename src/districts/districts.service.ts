import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';
import { State } from '../states/state.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class DistrictsService {
  constructor(
  @InjectRepository(District)
  private districtRepository: Repository<District>,

  @InjectRepository(State)
  private stateRepository: Repository<State>,
) {}
  async findAll(
  stateId?: number,
  page = 1,
  limit = 10,
  search?: string,
  sortBy = 'id',
  order: 'ASC' | 'DESC' = 'ASC',
) {
  const query = this.districtRepository
    .createQueryBuilder('district')
    .leftJoinAndSelect('district.state', 'state')
    .leftJoinAndSelect('district.subdistricts', 'subdistrict');

  if (stateId) {
    query.andWhere(
      'state.id = :stateId',
      { stateId },
    );
  }

  console.log('SEARCH=', search);
  console.log('TYPE=', typeof search);
  console.log('PARAM=', '%'+ search +'%');
  console.log('STATEID=', stateId);
  if (search) {
    query.andWhere(
      'district.name LIKE :search',
      {
        search: '%'+ search +'%',
      },
    );
  }

  query.orderBy('district.name',order);

  query
    .skip((page - 1) * limit)
    .take(limit);

  console.log(query.getSql());
  console.log(query.getParameters());
  const [data, total] = await query.getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
  };
}
  async findOne(id: number) {
  return await this.districtRepository.findOne({
    where: { id },
    relations: {
      state: true,
      subdistricts: true,
    },
  });
}
  async create(data:any){

  const state = await this.stateRepository.findOne({
    where:{
      id:data.stateId,
    },
  });

  if(!state){
    throw new NotFoundException('State not found');
  }

  const district = this.districtRepository.create({
    name:data.name,
    state,
  });

  return this.districtRepository.save(district);
}
  update(id: number, data: Partial<District>) {
    return this.districtRepository.update(id, data);
  }
  remove(id: number) {
    return this.districtRepository.delete(id);
  }
}