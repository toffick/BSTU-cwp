import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class WorkPeriodController extends CrudController {
  constructor ({workPeriodService, cacheService}) {
    super(workPeriodService, cacheService);

    this.calcCoupleWorkPeriod = this.calcCoupleWorkPeriod.bind(this);

    this.routes['/couple-work-period/:userId'] = [
      {method: 'get', cb: this.calcCoupleWorkPeriod}
    ];

    this.registerRoutes();
  }

  async readAll (req, res) {
    let data = await this.service.readChunk(req.query, {
      teamId: req.meta.teamId,
      userId: req.meta.userId
    });
    this.cache.set(req, data);
    send(req, res, data);
  }

  async read (req, res) {
    let data = (await this.service.readChunk(req.query,
      {
        id: req.params.id,
        teamId: req.meta.teamId,
        userId: req.meta.userId
      }))[0];
    this.cache.set(req, data);
    send(req, res, data);
  }

  async create (req, res) {
    const data = req.body;
    data.teamId = req.meta.teamId;
    data.userId = req.meta.userId;
    send(req, res,
      await this.service.create(data));
  }

  async update (req, res) {
    const data = req.body;
    data.teamId = req.meta.teamId;
    data.userId = req.meta.userId;
    send(req, res,
      await await this.service.update(req.params.id, data));
  }

  async calcCoupleWorkPeriod (req, res) {
    let data = await this.service.calculateCoupleWorkPeriod(
      req.meta.userId,
      req.params.userId,
      req.meta.teamId);
    this.cache.set(req, {commonWorkTime: data});
    send(req, res, {commonWorkTime: data});
  }
};
