import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { State } from '../../states/state.entity';

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
}