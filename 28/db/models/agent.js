module.exports = (Sequelize, sequelize) => {
  return sequelize.define('Agent', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
		                                                                                                                        callsign: {type: Sequelize.STRING}
  });
};
