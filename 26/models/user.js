export default (Sequelize, sequelize) => {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    timezone: {type: Sequelize.STRING},
    validated: {type: Sequelize.BOOLEAN},
    validationToken: {type: Sequelize.STRING}
  });
};
