import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VillagesService } from './villages.service';
import { CreateVillageDto } from './dto/create-village.dto';
import { UpdateVillageDto } from './dto/update-village.dto';
import { Subdistrict } from '../subdistricts/entities/subdistrict.entity';

@Controller('villages')
export class VillagesController {
  constructor(private readonly villagesService: VillagesService) {}

  @Post()
  create(@Body() createVillageDto: CreateVillageDto) {
    return this.villagesService.create(createVillageDto);
  }

  @Get()
  findAll(@Query('subdistrictId') subdistrictId?: string ){
    return this.villagesService.findAll(
      subdistrictId?Number(subdistrictId):undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.villagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVillageDto: UpdateVillageDto) {
    return this.villagesService.update(+id, updateVillageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.villagesService.remove(+id);
  }
}
