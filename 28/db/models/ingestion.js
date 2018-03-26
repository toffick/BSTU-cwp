module.exports = (Sequelize, sequelize) => {
  return sequelize.define('Ingestion', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
		                                                                                                                        when: {type: Sequelize.DATE}
  });
};
