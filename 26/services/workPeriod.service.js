import CrudService from './crud.service';
import bluebird from 'bluebird';
import {calcJointTime} from '../helpers/dates.helper';

export default class WorkPeriod extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['WorkPeriod'], schemas['workPeriod'], errors);
    this.teamRepository = context['Team'];
  }

  async calculateCoupleWorkPeriod (userSource, userCompare, teamId) {
    teamId = parseInt(teamId);
    if (isNaN(teamId)) throw this.errors.invalidId;

    const team = await this.teamRepository.findById(teamId);

    if (!team) throw this.errors.notFound;

    const teamUsers = await team.getUsers();

    const usersWorkPeriods = await bluebird.mapSeries([userSource, userCompare], async (userId) => {
      const user = teamUsers.find(teamUser => teamUser.id === +userId);
      if (!user) throw this.errors.userIsNotFound(userId);

      const workPeriod = await this.repository.findOne({
        where: {
          userId: userId,
          teamId: teamId
        }
      });

      if (!workPeriod) throw this.errors.userDoesNotWork(userId);

      return {
        workPeriod: workPeriod.get({raw: true}),
        timezone: user.timezone
      };
    });

    return calcJointTime(usersWorkPeriods);
  }
}
