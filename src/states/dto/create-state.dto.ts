import { IsNotEmpty,IsNumber, IsString } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

 
  @IsNumber()
  countryId!: number;
}