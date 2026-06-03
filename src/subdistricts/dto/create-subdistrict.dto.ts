import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubdistrictDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  districtId!: number;
}