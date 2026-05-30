import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subdistricts')
export class Subdistrict {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  district_id!: number;
}