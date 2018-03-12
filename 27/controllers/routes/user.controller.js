import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class User extends CrudController {
  constructor ({userService, cacheService, tweetController}) {
    super(userService, cacheService);

    this.router.use('/:userId/tweets', (req, res, next) => {
      req.meta.userId = req.params.userId;
      next();
    }, tweetController.router);

    this.registerRoutes();
  }

};
