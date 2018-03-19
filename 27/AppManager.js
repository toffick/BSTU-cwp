import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from 'config';
import tempDataToDb from './helpers/tempDataToDb.helper';
import YAML from 'yamljs';

const CONTENT_TYPE_HANDLERS = {
  'application/yaml': (req, res, next) => {
    req.setEncoding('utf8');
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      req.body = YAML.parse(body);
      next();
    });
  },
  'application/json': (req, res, next) => {
    next();
  }
};

export default async (container) => {
  await container.resolve('context').sequelize.sync({force: true});
  await tempDataToDb(container.resolve('context'));

  const app = express();

  app.use(bodyParser.json());
  app.use((req, res, next) => {
    const contentType = req.headers['content-type'] || 'application/json';
    const handler = CONTENT_TYPE_HANDLERS[contentType];

    handler(req, res, next);
  });

  app.use('/api',
    container.resolve('loggerGlobal'),
    container.resolve('cacheGlobal'),
    container.resolve('apiController'),
    container.resolve('errorGlobal')
  );

  return app;
};
