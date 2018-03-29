module.exports = (Sequelize, sequelize) => {
  return sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: Sequelize.STRING,
		password: Sequelize.STRING,
    codes: Sequelize.ARRAY(Sequelize.STRING)
  });
};
