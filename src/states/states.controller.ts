import { Controller, Get , Post,Patch,Delete,Param, Body ,Query} from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';

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

  console.log('SEARCH CONTROLLER=',search);
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

   @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreateStateDto,
  ) {
    return this.statesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statesService.remove(+id);
  }
}
