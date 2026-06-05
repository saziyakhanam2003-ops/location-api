import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './state.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { ReturnDocument } from 'typeorm/driver/mongodb/typings.js';


@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  async findAll(
  countryId?: number,
  page = 1,
  limit = 10,
  search?: string,
  sortBy = 'id',
  order: 'ASC' | 'DESC' = 'ASC',
) {
  const query = this.stateRepository
    .createQueryBuilder('state')
    .leftJoinAndSelect('state.country', 'country')
    .leftJoinAndSelect('state.districts', 'district');

  // Filter by country
  if (countryId) {
    query.andWhere('country.id = :countryId', {
      countryId: Number(countryId),
    });
  }

console.log('SERVICE SEARCH=', search);
console.log('PARAM=', '%'+{search}+'%');

  // Search by state name
  if (search) {
    query.andWhere('state.name LIKE :search', {
      search: '%'+{search}+'%',
    });
  }

  // Sorting
  query.orderBy('state.name', order);

  // Pagination
  query.skip((page - 1) * limit).take(limit);
  console.log('SEARCH=',search);
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
  async create(createStateDto: CreateStateDto) {
  const state = this.stateRepository.create({
    name: createStateDto.name,
    code: createStateDto.code,
    country: {
      id: createStateDto.countryId,
    } as any,
  });
  return this.stateRepository.save(state);
}
  async update(id:number,data:Partial<State>){
    await this.stateRepository.update(id,data);
    return this.stateRepository.findOne({
      where:{id},
      relations:{
        country:true,
        districts:true,
      }
    });

  }
  async remove(id:number){
    return this.stateRepository.delete(id);
  }
}
  // create(CreateStateDto:CreateStateDto):Promise<State>{
  //   const state = this.stateRepository.create(CreateStateDto);
  //   return this.stateRepository.save(state);
  // }
