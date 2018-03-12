import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class Tweet extends CrudController {
  constructor ({tweetService, cacheService, likeController}) {
    super(tweetService, cacheService);

    this.router.use('/:tweetId/likes', (req, res, next) => {
      req.meta.tweetId = req.params.tweetId;
      next();
    }, likeController.router);

    this.registerRoutes();
  }

  async readAll (req, res) {
    let data = await this.service.readChunk(req.query, {
      authorId: req.meta.userId
    });
    this.cache.set(req, data);
    send(req, res, data);
  }

  async read (req, res) {
    let data = await this.service.readChunk(req.query,
      {
        id: req.params.id,
        authorId: req.meta.userId
      }, true);
    this.cache.set(req, data);
    send(req, res, data);
  }

  async create (req, res) {
    const data = req.body;
    data.authorId = req.meta.userId;
    send(req, res,
      await this.service.create(data));
  }

  async update (req, res) {
    const data = req.body;
    data.authorId = req.meta.userId;
    send(req, res,
      await await this.service.update(req.params.id, data));
  }

};
