export default (Sequelize, sequelize) => {
  return sequelize.define('Like', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
