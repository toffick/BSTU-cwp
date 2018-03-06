import {createContainer, asClass, asValue, asFunction, Lifetime} from 'awilix';
import {Sequelize} from 'sequelize';
import context from '../context';
import errors from '../helpers/errors.helper';

export default () => {
  const container = createContainer();

  container.loadModules([
    ['services/*.js', {register: asClass}],
    ['controllers/*.js', {register: asClass}],
    ['global-controllers/*.js', {register: asFunction}]
  ], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }
  });

  container.register({
    errors: asValue(errors)
  });

  container.register({
    Sequelize: asValue(Sequelize),
    context: asFunction(context)
  });

  return container;
};
