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
    return this.subdistrictRepository.find({
      relations:{
        district:true,
        villages:true,
      },
    });
  }

  findOne(id: number) {
    return this.subdistrictRepository.findOne({
      where: { id },
    });
  }

  async create(data:any){
    const subdistrict = {
      name:data.name,
      district:{
       id:data.districtId,
      }as any,
    };

    return this.subdistrictRepository.save(subdistrict as any);
  }
  update(id: number, data: Partial<Subdistrict>) {
    return this.subdistrictRepository.update(id, data);
  }

  remove(id: number) {
    return this.subdistrictRepository.delete(id);
  }
}