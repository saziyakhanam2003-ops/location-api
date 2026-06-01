import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateVillageDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  subdistrictId!: number;
}