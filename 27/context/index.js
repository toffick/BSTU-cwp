/* eslint-disable sort-keys */
import config from 'config';
import {tweet, user, like} from '../models';

export default ({Sequelize}) => {
  const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

  const User = user(Sequelize, sequelize);
  const Tweet = tweet(Sequelize, sequelize);
  const Like = like(Sequelize, sequelize);

  Tweet.belongsToMany(User, {as: 'Likes', through: Like, otherKey: 'authorId', foreignKey: 'tweetId'});

  User.hasMany(Tweet, {foreignKey: 'authorId'});

  return {
    Tweet,
    User,
    Like,
    sequelize,
    Sequelize
  };
};
