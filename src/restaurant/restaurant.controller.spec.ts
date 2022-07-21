import { ConflictException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantTypeController } from './controller/restaurant.type.controller';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantType } from './entity/restaurant.type.entity';
import { RestaurantService } from './restaurant.service';

describe('RestaurantController', () => {
  let restaurantController: RestaurantController;
  let restaurantTypeController: RestaurantTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.test.env',
        }),
        TypeOrmModule.forRoot({
          type: 'mariadb',
          username: 'root',
          password: 'password',
          database: 'test',
          entities: [Restaurant, RestaurantType],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Restaurant, RestaurantType]),
      ],
      controllers: [RestaurantController, RestaurantTypeController],
      providers: [RestaurantService],
    }).compile();

    restaurantController =
      module.get<RestaurantController>(RestaurantController);
    restaurantTypeController = module.get<RestaurantTypeController>(
      RestaurantTypeController,
    );
  });

  describe('Create API Test', () => {
    it('식당 Type 생성 API Test', async () => {
      const restaurantType = await restaurantTypeController.createRestaurant({
        type: '중식',
      });

      expect(restaurantType.type).toEqual('중식');
    });

    it('식당 생성 API Test', async () => {
      const restaurantType = await restaurantTypeController.findAllRestaurant();

      const restaurant = await restaurantController.createRestaurant({
        title: '취향',
        restaurantTypeId: restaurantType[0].id,
      });

      expect(restaurant.title).toEqual('취향');
    });
  });

  describe('Find API Test', () => {
    it('식당 Type 조회 API Test', async () => {
      const restaurantType = await restaurantTypeController.findAllRestaurant();

      expect(restaurantType[0].type).toEqual('중식');
    });

    it('식당 조회 API Test', async () => {
      const restaurant = await restaurantController.findAllRestaurant();

      expect(restaurant[0].title).toEqual('취향');
    });
  });

  describe('Duplicate Error Test', () => {
    it('식당 Type API 중복생성 방지 Test', async () => {
      try {
        await restaurantTypeController.createRestaurant({ type: '중식' });
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }
    });

    it('식당 API 중복생성 방지 Test', async () => {
      try {
        const restaurantType =
          await restaurantTypeController.findAllRestaurant();

        await restaurantController.createRestaurant({
          title: '취향',
          restaurantTypeId: restaurantType[0].id,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }
    });
  });
});
