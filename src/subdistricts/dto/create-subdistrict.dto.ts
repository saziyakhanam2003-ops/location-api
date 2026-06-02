import { IsNumber, IsString } from 'class-validator';

export class CreateSubdistrictDto {
  @IsString()
  name!: string;

  @IsNumber()
  districtId!: number;
}