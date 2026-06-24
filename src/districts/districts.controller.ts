import { Controller, Get, Post, Body, Patch, Param, Delete,Query, Search } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiTags,ApiOperation,ApiQuery,ApiParam } from '@nestjs/swagger';

@ApiTags('districts')
@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}
  @ApiOperation({
    summary:'Create District',
  })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtsService.create(createDistrictDto);
  }
  @ApiOperation({
    summary:'Get Districts',
  })

  @ApiQuery({
  name: 'stateId',
  required: false,
  example: 1,
})

@ApiQuery({
  name: 'search',
  required: false,
  example: 'Jai',
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
  @Query('stateId') stateId?: string,
  @Query('page') page = '1',
  @Query('limit') limit = '10',
  @Query('search') search? : string,
  @Query('sortBy') sortBy = 'id',
  @Query('order') order: 'ASC' | 'DESC' = 'ASC',
) {
  return this.districtsService.findAll(
    stateId?Number(stateId):undefined,
    Number(page),
    Number(limit),
    search,
    sortBy,
    order,
  );
}
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'District ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtsService.findOne(+id);
  }
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'District ID',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtsService.update(+id, updateDistrictDto);
  }
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'District ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtsService.remove(+id);
  }
}
