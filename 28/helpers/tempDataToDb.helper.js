const tweets = require('../data/db/tweets.json');
const users = require('../data/db/users.json');

module.exports = async (db) => {
	const dbUsers = await db['User'].bulkCreate(users);
	const dbTweet = await db['Tweet'].bulkCreate(tweets);
	await dbUsers[0].addTweets([dbTweet[0], dbTweet[1], dbTweet[2], dbTweet[9]]);
	await dbUsers[1].setTweets([dbTweet[3], dbTweet[4], dbTweet[5], dbTweet[6], dbTweet[10]]);
	await dbUsers[2].setTweets([dbTweet[7], dbTweet[8]]);

	await dbTweet[0].addLikes([dbUsers[0], dbUsers[1]]);
	await dbTweet[1].addLikes([dbUsers[0], dbUsers[2]]);
	await dbTweet[3].addLikes([dbUsers[0], dbUsers[1]]);
	await dbTweet[4].addLikes(dbUsers);
	await dbTweet[5].addLikes([dbUsers[0]]);
	await dbTweet[6].addLikes([dbUsers[0]]);
	await dbTweet[7].addLikes([dbUsers[0]]);
	await dbTweet[10].addLikes(dbUsers);
};
