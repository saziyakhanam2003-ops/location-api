import { IsNotEmpty,IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto {

  @ApiProperty({
    example:'Jaipur',
    description:'District name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
  
  @ApiProperty({
    example:1,
    description:'State ID',
  })

  @IsNumber()
  stateId!: number;
}