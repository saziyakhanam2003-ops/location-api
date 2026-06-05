import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVillageDto {
  @ApiProperty({
    example:'Mansarovar Village',
    description:'Village Name,'
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
  @ApiProperty({
    example:1,
    description:'Subdistrict ID',
  })

  @IsNumber()
  subdistrictId!: number;
}