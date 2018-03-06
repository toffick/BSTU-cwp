import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from 'config';
//
// const errors = require('./helpers/errors');
//
// const {propertySchema, agentSchema, officeSchema} = require('./schemas');
//
// const PropertyService = require('./services/property');
// const AgentService = require('./services/agent');
// const OfficeService = require('./services/office');
// const LoggerService = require('./services/logger');
// const CacheService = require('./services/cache');

export default async (container) => {

  await container.resolve('context').sequelize.sync({force: true});
  // await tempDataToDb(db);

  const app = express();
  //
  // // Services
  // const propertyService = new PropertyService(db.properties, db.agents, propertySchema, errors);
  // const agentService = new AgentService(db.agents, db.offices, agentSchema, errors);
  // const officeService = new OfficeService(db.offices, officeSchema, errors);
  // const loggerService = new LoggerService();
  // const cacheService = new CacheService();
  //
  // // Controllers
  // const logger = require('./global-controllers/logger')(loggerService);
  // const error = require('./global-controllers/error');
  // const cache = require('./global-controllers/cache')(cacheService, loggerService);
  // const apiController = require('./controllers/api')(
  //   propertyService,
  //   agentService,
  //   officeService,
  //   cacheService,
  //   config
  // );
  //
  // // Mounting
  app.use(express.static('public'));
  app.use(cookieParser(config.cookie.key));
  app.use(bodyParser.json());
  //

  app.use('/api', container.resolve('loggerGlobal'));
  // app.use('/api', cache);
  // app.use('/api', apiController);
  app.use('/api', container.resolve('errorGlobal'));

  return app;
};
