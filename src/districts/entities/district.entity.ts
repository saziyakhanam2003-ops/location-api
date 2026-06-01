import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';

import { State } from '../../states/state.entity';
import { Subdistrict } from '../../subdistricts/entities/subdistrict.entity';


@Entity('districts')
export class District{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    name!:string;
    @ManyToOne(
        ()=> State,
        (state) => state.districts
    )
    @JoinColumn({name:'state_id'})
    state!:State;

    @OneToMany(
    ()=>Subdistrict,
    (Subdistrict)=>Subdistrict.district,
    )
    subdistricts!:Subdistrict[];
}