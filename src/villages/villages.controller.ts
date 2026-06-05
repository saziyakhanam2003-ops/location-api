import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Search } from '@nestjs/common';
import { VillagesService } from './villages.service';
import { CreateVillageDto } from './dto/create-village.dto';
import { UpdateVillageDto } from './dto/update-village.dto';
import { Subdistrict } from '../subdistricts/entities/subdistrict.entity';
import { ApiTags,ApiOperation,ApiQuery } from '@nestjs/swagger';
@ApiTags('Villages')
@Controller('villages')
export class VillagesController {
  constructor(private readonly villagesService: VillagesService) {}

  @ApiOperation({
    summary:'Create Village',
  })

  @Post()
  create(@Body() createVillageDto: CreateVillageDto) {
    return this.villagesService.create(createVillageDto);
  }

  @ApiOperation({
  summary: 'Get Villages',
})

@ApiQuery({
  name: 'subdistrictId',
  required: false,
})

@ApiQuery({
  name: 'page',
  required: false,
  example: 1,
})

@ApiQuery({
  name: 'limit',
  required: false,
  example: 10,
})

@ApiQuery({
  name: 'search',
  required: false,
  example: 'Mansarovar',
})

@ApiQuery({
  name: 'sortBy',
  required: false,
  example: 'name',
})

@ApiQuery({
  name: 'order',
  required: false,
  example: 'ASC',
})

  @Get()
  findAll(
  @Query('subdistrictId') subdistrictId?: number,
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('search') search?:string,
  @Query('sortBy') sortBy='id',
  @Query('order') order:'ASC'| 'DESC'='ASC',
) {
  return this.villagesService.findAll(
    subdistrictId,
    Number(page),
    Number(limit),
    search,
    sortBy,
    order,
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
