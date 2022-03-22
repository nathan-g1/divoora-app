import {Entity, model, property} from '@loopback/repository';

@model()
export class Dish extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  restaurantId: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Dish>) {
    super(data);
  }
}

export interface DishRelations {
  // describe navigational properties here
}

export type DishWithRelations = Dish & DishRelations;
