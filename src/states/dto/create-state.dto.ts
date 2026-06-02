import { IsNotEmpty,IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  code!: string;

  @Type(()=>Number)
  @IsNumber()
  countryId!: number;
}