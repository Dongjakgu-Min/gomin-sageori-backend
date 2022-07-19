import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RestaurantTypeDto } from '../dto/restaurant.type.dto';
import { RestaurantService } from '../restaurant.service';

@Controller('restaurant-type')
export class RestaurantTypeController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ApiOperation({ summary: '저장된 모든 식당 타입을 불러옵니다.' })
  @Get()
  findAllRestaurant() {
    return this.restaurantService.findAllRestaurantType();
  }

  @ApiOperation({ summary: '새로운 식당 타입을 생성합니다.' })
  @Post()
  createRestaurant(@Body() restaurantTypeDto: RestaurantTypeDto) {
    return this.restaurantService.createRestaurantType(restaurantTypeDto);
  }
}
