import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantType } from './restaurant.type.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToOne(
    () => RestaurantType,
    (restaurantType) => restaurantType.restaurants,
    { onDelete: 'CASCADE' },
  )
  restaurantType: RestaurantType;
  @Column({ nullable: true })
  restaurantTypeId: number;
}
