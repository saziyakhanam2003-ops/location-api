import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';
@Entity('states')
export class State{
  @PrimaryGeneratedColumn()
  id!:number;
  @Column()
  name!:string;
  @Column({nullable:true})
  code!:string;
}

