import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class RestaurantType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @OneToMany(() => Restaurant, (restaurant) => restaurant.restaurantType)
  restaurants: Restaurant[];
}
