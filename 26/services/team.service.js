import CrudService from './crud.service';
import {dateInRange,calcJointTime} from '../helpers/dates';
import bluebird from 'bluebird';

export default class Team extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['Team'], schemas['team'], errors);
    this.userRepository = context['User'];
    this.workPeriod = context['WorkPeriod'];
  }

  async read (id) {
    id = parseInt(id);
    if (isNaN(id)) {
      throw this.errors.invalidId;
    }

    const item = await this.repository.findById(id);

    if (!item) {
      throw this.errors.notFound;
    }

    const users = await item.getUsers();
    const usersWithStatus = await bluebird.mapSeries(users, async (user) => {
      const workPeriod = (await user.getWorkPeriods({where: {teamId: item.dataValues.id}, raw: true}))[0];
      if (!workPeriod) {
        user.dataValues.status = 'inactive';
        return user;
      }

      let userIsActive = dateInRange(workPeriod, user.timezone);
      user.dataValues.status = userIsActive ? 'active' : 'inactive';
      return user;
    });

    return {
      ...item.get({raw: true}),
      users: usersWithStatus
    };
  }

  async calculateCoupleWorkPeriod (usersIds, teamId) {
    teamId = parseInt(teamId);
    if (isNaN(teamId)) throw this.errors.invalidId;

    const item = await this.repository.findById(teamId);

    if (!item) throw this.errors.notFound;

    const teamUsers = await item.getUsers();

    const usersWorkPeriods = await bluebird.mapSeries(usersIds, async (userId) => {
      if (!teamUsers.find(teamUser => teamUser.id === userId)) {
        throw this.errors.userIsNotFound(userId);
      }

      const workPeriod = await this.workPeriod.findOne({
        where: {
          userId: userId,
          teamId: teamId
        }
      });

      if (!workPeriod) {
        throw this.errors.userDoesNotWork(userId);
      }

      return workPeriod;
    });

    return calcJointTime(usersWorkPeriods);
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
