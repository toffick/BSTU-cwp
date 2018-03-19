import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class Tweet extends CrudController {
  constructor ({tweetService, cacheService, likeController, entityCheckerMiddleware}) {
    super(tweetService, cacheService);

    this.router.use('/:tweetId/likes', entityCheckerMiddleware, likeController.router);

    this.registerRoutes();
  }

  async readAll (req, res) {
    let data = await this.service.readChunk(req.query, {
      authorId: req.params.userId
    });
    this.cache.set(req, data);

    send(req, res, data);
  }

  async read (req, res) {
    let data = await this.service.readChunk(req.query,
      {
        authorId: req.params.userId,
        id: req.params.id
      }, true);
    this.cache.set(req, data);

    send(req, res, data);
  }

  async create (req, res) {
    const data = req.body;
    data.authorId = req.params.userId;

    send(req, res,
      await this.service.create(data));
  }

  async update (req, res) {
    const data = req.body;

    send(req, res,
      await await this.service.update(
        {
          id: req.params.id,
          authorId: req.params.userId
        }, data)
    );
  }

  async delete (req, res) {
    send(req, res,
      await await this.service.delete(
        {
          id: req.params.id,
          authorId: req.params.userId
        })
    );
  }
};
