import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { District } from '../../districts/entities/district.entity';
import { Village } from '../../villages/entities/village.entity';

@Entity('subdistricts')
export class Subdistrict {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(
  ()=> District,
  (district)=> district.subdistricts,
  )

  @JoinColumn({name:'district_id'})
  district!:District;
  
  @OneToMany(
    ()=>Village,
    (village)=>village.subdistrict,
  )
  villages!:Village[];
  
  
}