import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Village {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  subdistrict_id!: number;
}
