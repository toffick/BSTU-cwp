/* eslint-disable sort-keys */
import config from 'config';
import {team, user, workPeriod} from '../models';

export default ({Sequelize}) => {
  const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

  const User = user(Sequelize, sequelize);
  const Team = team(Sequelize, sequelize);
  const WorkPeriod = workPeriod(Sequelize, sequelize);

  Team.belongsToMany(User, {through: 'TeamUser', foreignKey: 'teamId'});
  User.belongsToMany(Team, {through: 'TeamUser', foreignKey: 'userId'});

  WorkPeriod.belongsTo(Team, {foreignKey: 'teamId'});
  WorkPeriod.belongsTo(User, {foreignKey: 'userId'});

  return {
    Team,
    User,
    WorkPeriod,
    sequelize,
    Sequelize
  };
};
