import CrudController from './crud.controller';
import {send} from '../../helpers/sender.helper';

export default class Like extends CrudController {
  constructor ({likeService, cacheService}) {
    super(likeService, cacheService);

    this.readAll = this.readAll.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);

    this.routes = {
      '/': [
        {method: 'get', cb: this.readAll}
      ],
      '/like': [{
        method: 'post', cb: this.create
      }],
      '/dislike': [{
        method: 'post', cb: this.delete
      }]
    };

    this.registerRoutes();
  }

  async readAll (req, res) {
    let data = await this.service.readChunk(req.meta.tweetId);
    this.cache.set(req, data);

    send(req, res, data);
  }

  async create (req, res) {
    const item = await this.service.create(
      {
        likerId: req.body.likerId,
        tweetId: req.meta.tweetId
      });
    send(req, res, item);
  }

  async delete (req, res) {
    const item = await this.service.delete(
      {
        tweetId: req.meta.tweetId,
        authorId: req.meta.userId,
        likerId: req.body.likerId
      });
    send(req, res, item);
  }
};
