import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Restaurant} from '../models';
import {RestaurantRepository} from '../repositories';

export class RestaurantController {
  constructor(
    @repository(RestaurantRepository)
    public restaurantRepository : RestaurantRepository,
  ) {}

  @post('/restaurants', {
    responses: {
      '200': {
        description: 'Restaurant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restaurant)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurant, {
            title: 'NewRestaurant',
            exclude: ['id'],
          }),
        },
      },
    })
    restaurant: Omit<Restaurant, 'id'>,
  ): Promise<Restaurant> {
    return this.restaurantRepository.create(restaurant);
  }

  @get('/restaurants/count', {
    responses: {
      '200': {
        description: 'Restaurant model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Restaurant) where?: Where<Restaurant>,
  ): Promise<Count> {
    return this.restaurantRepository.count(where);
  }

  @get('/restaurants', {
    responses: {
      '200': {
        description: 'Array of Restaurant model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Restaurant, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Restaurant) filter?: Filter<Restaurant>,
  ): Promise<Restaurant[]> {
    return this.restaurantRepository.find(filter);
  }

  // Get all restaurants by name with case insensitive search
  @get('/restaurants/search/{name}', {
    responses: {
      '200': {
        description: 'Array of Restaurant model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Restaurant, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async findByName(
    @param.path.string('name') name?: string,
  ): Promise<Restaurant[]> {
    const pattern = new RegExp('.*' + name + '.*', 'i');
    const restaurants = await this.restaurantRepository.find({
      where: {
        name: {
          // @ts-ignore
          like: pattern
        },
      },
    });
    return restaurants;
  }

  @patch('/restaurants', {
    responses: {
      '200': {
        description: 'Restaurant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurant, {partial: true}),
        },
      },
    })
    restaurant: Restaurant,
    @param.where(Restaurant) where?: Where<Restaurant>,
  ): Promise<Count> {
    return this.restaurantRepository.updateAll(restaurant, where);
  }

  @get('/restaurants/{id}', {
    responses: {
      '200': {
        description: 'Restaurant model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Restaurant, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Restaurant, {exclude: 'where'}) filter?: FilterExcludingWhere<Restaurant>
  ): Promise<Restaurant> {
    return this.restaurantRepository.findById(id, filter);
  }

  @patch('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurant PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurant, {partial: true}),
        },
      },
    })
    restaurant: Restaurant,
  ): Promise<void> {
    await this.restaurantRepository.updateById(id, restaurant);
  }

  @put('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurant PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() restaurant: Restaurant,
  ): Promise<void> {
    await this.restaurantRepository.replaceById(id, restaurant);
  }

  @del('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurant DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.restaurantRepository.deleteById(id);
  }
}
