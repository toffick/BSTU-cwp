import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class User extends CrudController {
  constructor ({userService, cacheService}) {
    super(userService, cacheService);

    this.registerRoutes();
  }

};
