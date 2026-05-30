import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('villages')
export class Village {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  district_id!: number;
}
