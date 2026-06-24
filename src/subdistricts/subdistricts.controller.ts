import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubdistrictsService } from './subdistricts.service';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';

@Controller('subdistricts')
export class SubdistrictsController {
  constructor(private readonly subdistrictsService: SubdistrictsService) {}

  @Post()
  create(@Body() createSubdistrictDto: CreateSubdistrictDto) {
    return this.subdistrictsService.create(createSubdistrictDto);
  }

  @Get()
findAll(
  @Query('districtId') districtId?: string,
  @Query('page') page = '1',
  @Query('limit') limit = '10',
  @Query('search') search?: string,
  @Query('sortBy') sortBy = 'id',
  @Query('order') order: 'ASC' | 'DESC' = 'ASC',
) {
  return this.subdistrictsService.findAll(
    districtId ? Number(districtId) : undefined,
    Number(page),
    Number(limit),
    search,
    sortBy,
    order,
  );
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subdistrictsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubdistrictDto: UpdateSubdistrictDto) {
    return this.subdistrictsService.update(+id, updateSubdistrictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subdistrictsService.remove(+id);
  }
}
