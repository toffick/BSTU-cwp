import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class User extends CrudController {
  constructor ({userService, cacheService, tweetController, entityCheckerMiddleware}) {
    super(userService, cacheService);

    this.router.use('/:userId/tweets', entityCheckerMiddleware, tweetController.router);

    this.registerRoutes();
  }
};
