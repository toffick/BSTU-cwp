import CrudController from './crud.controller';

export default class UserController extends CrudController {
  constructor ({userService, cacheService}) {
    super(userService, cacheService);

    this.checkByToken = this.checkByToken.bind(this);

    this.routes['/:id/validation'] = [
      {method: 'get', cb: this.checkByToken}
    ];

    this.registerRoutes();
  }

  async checkByToken (req, res) {
    await this.service.checkByToken(req.params.id, req.query.token);

    res.json({success: true});
  };

};
