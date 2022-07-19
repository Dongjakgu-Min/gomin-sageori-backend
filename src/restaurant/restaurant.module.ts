import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantType } from './entity/restaurant.type.entity';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantTypeController } from './controller/restaurant.type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantType])],
  controllers: [RestaurantController, RestaurantTypeController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
