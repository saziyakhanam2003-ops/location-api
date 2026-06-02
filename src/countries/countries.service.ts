import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  findAll(): Promise<Country[]> {
    return this.countryRepository.find({
      relations:{
        states:true,
      },
    });
  }
  async create(data: any) {
  const country = this.countryRepository.create({
    name: data.name,
    code: data.code,
  });

  return this.countryRepository.save(country);
}
}
