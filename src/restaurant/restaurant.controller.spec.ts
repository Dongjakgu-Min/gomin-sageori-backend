import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './controller/restaurant.controller';

describe('RestaurantController', () => {
  let controller: RestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
  });
});
