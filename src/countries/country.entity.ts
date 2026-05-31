import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { State } from '../states/state.entity';
@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  code!: string;

  @OneToMany(
    ()=> State,
    (state) => state.country,
  )
  states!:State[];
}