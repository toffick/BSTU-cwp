module.exports = (Sequelize, sequelize) => {
  return sequelize.define('Food', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
		                                                                                                                        name: {type: Sequelize.STRING},
		                                                                                                                        calories: {type: Sequelize.BIGINT}
  });
};
