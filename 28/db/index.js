/* eslint-disable sort-keys */
const Sequelize = require('Sequelize');
const config = require('config');
const {
  agent,
  food,
  person,
  ingestion
} = require('./models');


module.exports = () => {
  const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

  const Agent = agent(Sequelize, sequelize);
  const Food = food(Sequelize, sequelize);
  const Person = person(Sequelize, sequelize);
  const Ingestion = ingestion(Sequelize, sequelize);

  Ingestion.belongsTo(Agent);
  Ingestion.belongsTo(Food);
  Ingestion.belongsTo(Person);

  Person.hasMany(Ingestion);
  Food.hasMany(Ingestion);
  Agent.hasMany(Ingestion);

  // Tweet.belongsToMany(User, {as: 'Likes', through: Like, otherKey: 'authorId', foreignKey: 'tweetId'});
  //
  // User.hasMany(Tweet, {foreignKey: 'authorId'});
  // Tweet.belongsTo(User, {foreignKey: 'authorId', as: 'author'});

  return {
    Agent,
    Food,
    Person,
    Ingestion,
    sequelize,
    Sequelize
  };
};
