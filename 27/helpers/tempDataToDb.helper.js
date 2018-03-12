const tweets = require('../data/db/tweets.json');
const users = require('../data/db/users.json');

export default async (db) => {
  const dbUsers = await db['User'].bulkCreate(users);
  const dbTweet = await db['Tweet'].bulkCreate(tweets);
  await dbUsers[0].addTweets([dbTweet[0], dbTweet[1], dbTweet[2]]);
  await dbUsers[1].setTweets([dbTweet[3], dbTweet[4], dbTweet[5], dbTweet[6]]);

  await dbTweet[0].addLikes([dbUsers[0], dbUsers[1]]);
  await dbTweet[1].addLikes([dbUsers[0]]);
  await dbTweet[3].addLikes([dbUsers[0], dbUsers[1]]);
  await dbTweet[4].addLikes([dbUsers[0], dbUsers[1]]);
  await dbTweet[5].addLikes([dbUsers[0]]);
};
