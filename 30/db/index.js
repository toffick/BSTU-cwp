const config = require('../config/default.json');
const user = require('./models/user');

module.exports = (Sequelize) => {
  const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

  const User = user(Sequelize, sequelize);

  return {
		User,
    sequelize,
    Sequelize
  };
};
