import {createContainer, asClass, asValue, asFunction, Lifetime} from 'awilix';
import {Sequelize} from 'sequelize';
import context from '../context';
import errors from '../helpers/errors.helper';
import apiController from '../controllers/api';
import schemas from '../schemas';

export default () => {
  const container = createContainer();

  container.loadModules([
    ['services/*.js', {register: asClass}],
    ['controllers/routes/*.js', {register: asClass}],
    ['global-controllers/*.js', {register: asFunction}]
  ], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }
  });

  container.register({
    apiController: asFunction(apiController).singleton(),
    schemas: asFunction(schemas)
  });

  container.register({
    errors: asValue(errors),
    Sequelize: asValue(Sequelize),
    context: asFunction(context)
  });

  return container;
};
