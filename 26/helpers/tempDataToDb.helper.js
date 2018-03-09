const team = require('../data/db/team.json');
const user = require('../data/db/user.json');
const workPeriod = require('../data/db/workPeriod.json');

export default async (db) => {
  const teams = await db['Team'].bulkCreate(team);
  const users = await db['User'].bulkCreate(user);
  await db['WorkPeriod'].bulkCreate(workPeriod);

  teams[0].addUser(users);
  teams[1].addUser([users[0], users[1]]);
  teams[2].addUser([users[1], users[2]]);
};
