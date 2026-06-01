import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Subdistrict } from '../../subdistricts/entities/subdistrict.entity';

@Entity('village')
export class Village {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(
  () => Subdistrict,
  (subdistrict)=> subdistrict.villages,
  )

  @JoinColumn({ name: 'subdistrict_id' })
  subdistrict!: Subdistrict;
}