/* eslint-disable sort-keys */
import config from 'config';
import {tweet, user, like} from './models/index';

export default ({Sequelize}) => {
  const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

  const User = user(Sequelize, sequelize);
  const Tweet = tweet(Sequelize, sequelize);
  const Like = like(Sequelize, sequelize);

  Tweet.belongsToMany(User, {as: 'Likes', through: Like, otherKey: 'authorId', foreignKey: 'tweetId'});

  User.hasMany(Tweet, {foreignKey: 'authorId'});
  Tweet.belongsTo(User, {foreignKey: 'authorId', as: 'author'});

  return {
    Tweet,
    User,
    Like,
    sequelize,
    Sequelize
  };
};
