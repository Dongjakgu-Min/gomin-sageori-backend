import { ConflictException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { RestaurantType } from './entity/restaurant.type.entity';
import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let datasource: DataSource;

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
      providers: [RestaurantService],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    datasource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    const restaurantRepository = await datasource.getRepository(Restaurant);
    const restaurantTypeRepository = await datasource.getRepository(
      RestaurantType,
    );

    restaurantRepository.delete({});
    restaurantTypeRepository.delete({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('RestaurantType', () => {
    it('식당 Type 생성 및 조회', async () => {
      const type = await service.createRestaurantType({ type: '한식' });
      expect(type.type).toBe('한식');

      const allType = await service.findAllRestaurantType();
      expect(allType.length).toBe(1);
      expect(allType[0].type).toBe('한식');
    });
  });

  describe('Restaurant', () => {
    it('식당 생성 및 조회', async () => {
      const restaurant = await service.createRestaurant({
        title: '파라다이스',
        restaurantTypeId: 1,
      });
      expect({
        title: restaurant.title,
        restaurantType: restaurant.restaurantTypeId,
      }).toEqual({ title: '파라다이스', restaurantType: 1 });

      const findRestaurant = await service.findAllRestaurant();
      expect(findRestaurant.length).toBe(1);
      expect(findRestaurant[0].title).toBe('파라다이스');
    });
  });

  describe('Duplicate Check', () => {
    it('중복생성 방지 확인', async () => {
      try {
        await service.createRestaurantType({ type: '한식' });
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }

      try {
        await service.createRestaurant({
          title: '파라다이스',
          restaurantTypeId: 1,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }
    });
  });
});
