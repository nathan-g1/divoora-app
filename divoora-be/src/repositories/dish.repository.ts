import {DefaultCrudRepository} from '@loopback/repository';
import {Dish, DishRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DishRepository extends DefaultCrudRepository<
  Dish,
  typeof Dish.prototype.id,
  DishRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Dish, dataSource);
  }
}
