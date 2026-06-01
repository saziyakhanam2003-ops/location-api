import { IsNotEmpty,IsNumber, IsString } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  code!: string;

  @IsNumber()
  countryid!: number;
}