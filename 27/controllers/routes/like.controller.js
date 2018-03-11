import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class Like extends CrudController {
  constructor ({likeService, cacheService}) {
    super(likeService, cacheService);

    this.registerRoutes();
  }

};
