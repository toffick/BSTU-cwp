import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class Tweet extends CrudController {
  constructor ({tweetService, cacheService}) {
    super(tweetService, cacheService);

    this.registerRoutes();
  }

};
