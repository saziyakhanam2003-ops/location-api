import { Controller, Get , Post,Patch,Delete,Param, Body ,Query} from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  findAll(@Query('countryId')countryId?:string) {
    console.log('countryId => ',countryId);
    return this.statesService.findAll(Number(countryId));
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
