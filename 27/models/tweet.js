export default (Sequelize, sequelize) => {
  return sequelize.define('Tweet', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {type: Sequelize.STRING},
    publishedOn: {type: Sequelize.BIGINT}
  });
};
