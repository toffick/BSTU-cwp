import {Router} from 'express';
import wrap from '../helpers/wrap.helper';

class CrudController {
  constructor (service, cacheService) {
    this.service = service;
    this.cache = cacheService;

    this.readAll = this.readAll.bind(this);
    this.read = this.read.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.router = Router();
    this.routes = {
      '/': [
        {method: 'get', cb: this.readAll},
        {method: 'post', cb: this.create},
        {method: 'put', cb: this.update},
        {method: 'delete', cb: this.delete}
      ],
      '/:id': [{method: 'get', cb: this.read}],
    };
  }

  async readAll (req, res) {
    let data = await this.service.readChunk(req.query);
    this.cache.set(req, data);
    res.json(data);
  }

  async read (req, res) {
    let data = await this.service.read(req.params.id);
    this.cache.set(req, data);
    res.json(data);
  }

  async create (req, res) {
    res.json(
      await this.service.create(req.body)
    );
  }

  async update (req, res) {
    res.json(
      await this.service.update(req.body)
    );
  }

  async delete (req, res) {
    res.json(
      await this.service.delete(req.body.id)
    );
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

module.exports = CrudController;
