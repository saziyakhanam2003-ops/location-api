import { Controller, Get ,Post,Body} from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(
    private readonly countriesService: CountriesService,
  ) {}

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Post()
  create(@Body() body:any){
    return this.countriesService.create(body);
  }
}
