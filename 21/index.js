const Sequelize = require('sequelize');
const config = require('./config.json');

const db = require('./context')(Sequelize, config);
const server = require('./AppManager')(db, config);
const tempDataToDb = require('./helpers/tempDataToDb');

(async function () {
    await db.sequelize.sync({force: true});
    await tempDataToDb(db);

    server.listen(config.app.port, () => console.log('Running'));
})();

var hal = require('hal');

var resource = new hal.Resource({name: "Harry"}, '/harry');
resource.link('hello', '/harry/hello');
console.log(resource.toJSON());
