const express = require('express');
const sequelize = require('sequelize');
const config = require('./config/default.json');
const db = require('./db')(sequelize);
const {setTestData} = require('./helpers');


(async () => {
	await db.sequelize.sync({force: true});
	await setTestData(db);

	await express.listen(config.app.port);
})();
