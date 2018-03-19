import {Router} from 'express';
import wrap from '../../helpers/wrap.helper';
import {send} from '../../helpers/sender.helper';

export default class Tweets {
  constructor ({tweetService, cacheService}) {
    this.service = tweetService;
    this.cache = cacheService;

    this.readAll = this.readAll.bind(this);

    this.router = Router();
    this.routes = {
      '/': [
        {method: 'get', cb: this.readAll}
      ]
    };

    this.registerRoutes();
  }

  async readAll (req, res) {
    let data = await this.service.readAllWithAuthors(req.meta.query);
    this.cache.set(req, data);

    send(req, res, data);
  }

  registerRoutes () {
    Object.keys(this.routes).forEach(route => {
      let handlers = this.routes[route];

      if (!handlers || !Array.isArray(handlers)) return;

      for (let handler of handlers) {
        this.router[handler.method](route, wrap(handler.cb));
      }
    });
  }
}
