import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Restaurant } from './restaurant/entity/restaurant.entity';
import { RestaurantType } from './restaurant/entity/restaurant.type.entity';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    RestaurantModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME
        ? process.env.DB_USERNAME
        : process.env.USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Restaurant, RestaurantType],
      synchronize: true,
      timezone: 'Z',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
