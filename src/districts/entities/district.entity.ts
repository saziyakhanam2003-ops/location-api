import { Entity,PrimaryGeneratedColumn,Column} from'typeorm';
@Entity('districts')
export class District{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    name!:string;
    @Column()
    state_id!:number;
}