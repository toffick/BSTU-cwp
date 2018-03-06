/* eslint-disable sort-keys */
export default (Sequelize, sequelize) => {
  return sequelize.define('Team', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {type: Sequelize.STRING},
    logo: {type: Sequelize.STRING}
  });
};
