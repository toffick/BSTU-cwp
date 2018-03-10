import CrudController from './crud.controller';

export default class TeamController extends CrudController {
  constructor ({teamService, cacheService, workPeriodController}) {
    super(teamService, cacheService);

    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);

    this.routes['/:id/user'] = [
      {method: 'put', cb: this.addUser},
      {method: 'delete', cb: this.removeUser}
    ];

    this.registerRoutes();

    this.router.use('/:teamId/user/:userId/work-period', (req, res, next) => {
      req.meta = {
        teamId: req.params.teamId,
        userId: req.params.userId
      };
      next();
    }, workPeriodController.router);
  }

  async addUser (req, res) {
    await this.service.addUser(req.body.userId, req.params.id);

    res.json({success: true});
  }

  async removeUser (req, res) {
    await this.service.removeUser(req.body.userId, req.params.id);

    res.json({success: true});
  }

};
