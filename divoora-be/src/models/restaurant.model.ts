import {Entity, model, property} from '@loopback/repository';

@model()
export class Restaurant extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
  description: string;

  @property({
    type: 'number',
  })
  rating?: number;

  @property({
    type: 'object',
    required: true,
  })
  location: object;

  @property({
    type: 'string',
    required: true,
  })
  priceRange: string;


  constructor(data?: Partial<Restaurant>) {
    super(data);
  }
}

export interface RestaurantRelations {
  // describe navigational properties here
}

export type RestaurantWithRelations = Restaurant & RestaurantRelations;
