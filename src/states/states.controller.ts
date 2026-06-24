import { Controller, Get , Post,Patch,Delete,Param, Body ,Query} from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
findAll(
  @Query('countryId') countryId?: string,
  @Query('page') page = '1',
  @Query('limit') limit = '10',
  @Query('search') search?: string,
  @Query('sortBy') sortBy = 'id',
  @Query('order') order: 'ASC' | 'DESC' = 'ASC',
) {

  console.log('CONTROLLER SEARCH=',search);
  console.log('TYPE=',typeof search);
  return this.statesService.findAll(
    Number(countryId),
    Number(page),
    Number(limit),
    search,
    sortBy,
    order,
  );
}
  @Post()
  create(@Body() CreateStateDto:CreateStateDto){
    return this.statesService.create(CreateStateDto);
  }
  @ApiParam({
  name: 'id',
  example: 1,
  description: 'State ID',
})
  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.statesService.findOne(+id);
}


  @ApiParam({
    name:'id',
    example:1,
    description:'State ID',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreateStateDto,
  ) {
    return this.statesService.update(+id, body);
  }
  @ApiParam({
    name:'id',
    example:1,
    description:'State ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statesService.remove(+id);
  }
}
