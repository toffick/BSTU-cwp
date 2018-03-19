export default (Sequelize, sequelize) => {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING}
  });
};
