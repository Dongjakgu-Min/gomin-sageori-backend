import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantDto } from './dto/restaurant.dto';
import { RestaurantTypeDto } from './dto/restaurant.type.dto';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantType } from './entity/restaurant.type.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantType)
    private readonly restaurantTypeRepository: Repository<RestaurantType>,
  ) {}

  async findAllRestaurant(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  async findAllRestaurantType(): Promise<RestaurantType[]> {
    return this.restaurantTypeRepository.find();
  }

  async createRestaurant(restaurant: RestaurantDto) {
    const isExist = await this.restaurantRepository.findOne({
      where: restaurant,
    });

    if (isExist) throw new ConflictException();

    return this.restaurantRepository.save(restaurant);
  }

  async createRestaurantType(restaurantType: RestaurantTypeDto) {
    const isExist = await this.restaurantTypeRepository.findOne({
      where: restaurantType,
    });

    if (isExist) throw new ConflictException();

    return this.restaurantTypeRepository.save(restaurantType);
  }

  async findRandomRestaurant(): Promise<Restaurant> {
    const result = await this.restaurantRepository.find();
    return result[Math.floor(Math.random() * result.length)];
  }

  async findRandomRestaurantByType(
    restaurantTypeId: number,
  ): Promise<Restaurant> {
    const result = await this.restaurantRepository.find({
      where: { restaurantTypeId },
      relations: ['restaurantType'],
    });

    return result[Math.floor(Math.random() * result.length)];
  }
}
