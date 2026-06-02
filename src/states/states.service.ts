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

  findAll(countryId?: number): Promise<State[]> {

  console.log('SERVICE countryId=>',countryId);
  if (countryId) {
   return this.stateRepository
  .createQueryBuilder('state')
  .leftJoinAndSelect('state.country', 'country')
  .leftJoinAndSelect('state.districts', 'district')
  .where('country.id = :countryId', {
    countryId: Number(countryId),
  })
  .getMany();
  }

  return this.stateRepository.find({
    relations: {
      country: true,
      districts: true,
    },
  });
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
    });

  }
  async remove(id:number){
    return this.stateRepository.delete(id);
  }
  // create(CreateStateDto:CreateStateDto):Promise<State>{
  //   const state = this.stateRepository.create(CreateStateDto);
  //   return this.stateRepository.save(state);
  // }
}