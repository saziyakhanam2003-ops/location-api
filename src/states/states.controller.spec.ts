import { Controller, Get } from '@nestjs/common';
import { StatesService } from './states.service';

@Controller('api/v1/states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  findAll() {
    return this.statesService.findAll();
  }
}
