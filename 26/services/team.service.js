import CrudService from './crud.service';
import {isDateInRange} from '../helpers/dates.helper';
import bluebird from 'bluebird';

export default class Team extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['Team'], schemas['team'], errors);
    this.userRepository = context['User'];
  }

  async read (id) {
    id = parseInt(id);
    if (isNaN(id)) throw this.errors.invalidId;

    const item = await this.repository.findById(id);

    if (!item) throw this.errors.notFound;

    const users = await item.getUsers();
    const usersWithStatus = await bluebird.mapSeries(users, async (user) => {
      const workPeriod = (await user.getWorkPeriods({where: {teamId: item.dataValues.id}, raw: true}))[0];

      // херня для минимизации объекта, чтобы yamljs не падал при yamljs.stringify()
      user = user.get({raw: true});
      delete user.TeamUser;

      if (!workPeriod) {
        user.status = 'inactive';
        return user;
      }

      let userIsActive = isDateInRange(workPeriod, user.timezone);
      user.status = userIsActive ? 'active' : 'inactive';
      return user;
    });

    return {
      ...item.get({raw: true}),
      users: usersWithStatus
    };
  }

  async addUser (userId, teamId) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw this.errors.notFound;
    if (!user.dataValues.validated) throw this.errors.nonValidated;

    const team = await this.repository.findById(teamId);

    if (!team) throw this.errors.notFound;

    return team.addUser(user);
  }

  async removeUser (userId, teamId) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw this.errors.notFound;

    const team = await this.repository.findById(teamId);

    if (!team) throw this.errors.notFound;

    return team.removeUser(user);
  }
}
