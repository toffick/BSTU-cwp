import {createContainer, asClass, asValue, asFunction, Lifetime} from 'awilix';
import {Sequelize} from 'sequelize';
import context from '../db/index';
import errors from '../api/helpers/errors.helper';
import apiController from '../api/controllers/api';

export default () => {
  const container = createContainer();

  container.loadModules([
    ['api/services/*.js', {register: asClass}],
    ['api/controllers/routes/*.js', {register: asClass}],
    ['api/global-controllers/*.js', {register: asFunction}],
    ['api/middlewares/*.js', {register: asFunction}],
    ['schemas/*.js', {register: asFunction}]
  ], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }
  });

  container.register({
    apiController: asFunction(apiController).singleton(),
  });

  container.register({
    errors: asValue(errors),
    Sequelize: asValue(Sequelize),
    context: asFunction(context)
  });

  return container;
};
