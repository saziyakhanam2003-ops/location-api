import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { District } from '../districts/entities/district.entity';
import { Country } from '../countries/country.entity';

@Entity('states')
export class State{
  @PrimaryGeneratedColumn()
  id!:number;
  @Column()
  name!:string;
  @Column({nullable:true})
  code!:string;
  @ManyToOne(
    ()=> Country,
    (country)=>country.states,
  )
  @JoinColumn({name:'country_id'})
  country!:Country;

  @OneToMany(
    ()=> District,
    (district)=> district.state,
  )
  districts!:District[];
}