import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubdistrictsService } from './subdistricts.service';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
@ApiTags('subdistricts')
@Controller('subdistricts')
export class SubdistrictsController {
  constructor(private readonly subdistrictsService: SubdistrictsService) {}
  @ApiOperation({
  summary: 'Create Subdistrict',
})
  @Post()
  create(@Body() createSubdistrictDto: CreateSubdistrictDto) {
    return this.subdistrictsService.create(createSubdistrictDto);
  }
  @ApiOperation({
  summary: 'Get Subdistricts',
})

@ApiQuery({
  name: 'districtId',
  required: false,
  example: 1,
})

@ApiQuery({
  name: 'search',
  required: false,
  example: 'Sang',
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
  @ApiParam({
    name:'id',
    example:1,
    
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subdistrictsService.findOne(+id);
  }
  @ApiParam({
    name:'id',
    example:1,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubdistrictDto: UpdateSubdistrictDto) {
    return this.subdistrictsService.update(+id, updateSubdistrictDto);
  }
  @ApiParam({
    name:'id',
    example:1,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subdistrictsService.remove(+id);
  }
}
