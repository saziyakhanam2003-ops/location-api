import {IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubdistrictDto {
  @ApiProperty({
    example:'Sanganer',
    description:'Subdistrict Name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example:1,
    description:'District ID',
  })

  @IsNumber()
  districtId!: number;
}