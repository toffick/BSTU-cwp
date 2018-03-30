const express = require('express');
const sequelize = require('sequelize');
const config = require('./config/default.json');
const db = require('./db')(sequelize);
const {setTestData} = require('./helpers');

const app = express();

(async () => {
	await db.sequelize.sync({force: true});
	await setTestData(db);

	app.listen(config.app.port,()=>{
		console.log(`listen port ${config.app.port}`);
	});
})();
