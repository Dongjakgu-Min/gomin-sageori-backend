import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RestaurantDto } from '../dto/restaurant.dto';
import { RestaurantService } from '../restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ApiOperation({ summary: '저장된 모든 식당을 불러옵니다.' })
  @Get()
  findAllRestaurant() {
    return this.restaurantService.findAllRestaurant();
  }

  @ApiOperation({ summary: '무작위의 식당을 선택합니다.' })
  @Get()
  findRandomRestaurant() {
    return this.restaurantService.findRandomRestaurant();
  }

  @ApiOperation({ summary: '새로운 식당을 생성합니다.' })
  @Post()
  createRestaurant(@Body() restaurantDto: RestaurantDto) {
    return this.restaurantService.createRestaurant(restaurantDto);
  }
}
