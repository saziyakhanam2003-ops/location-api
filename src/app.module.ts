import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesModule } from './states/states.module';
import { CountriesModule } from './countries/countries.module';
import { DistrictsModule } from './districts/districts.module';
import { VillagesModule } from './villages/villages.module';
import { SubdistrictsModule } from './subdistricts/subdistricts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT') || '5432'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities:true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    StatesModule,
    CountriesModule,
    DistrictsModule,
    VillagesModule,
    SubdistrictsModule,
  ],
})
export class AppModule {} 