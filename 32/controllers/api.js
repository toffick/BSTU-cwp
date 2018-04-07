const {Router} = require('express');
const repoController = require('./repo');
const {ability} = require('../authorization');

module.exports = (db) => {
	const router = Router({mergeParams: true});

	router.use('/repo', ability(), repoController(db));

	return router
};
