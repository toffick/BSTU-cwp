const {Router} = require('express');
const repoController = require('./repo');
const {ability} = require('../authorization');

module.exports = (db) => {
	const router = Router({mergeParams: true});

	router.use(ability());
	router.use('/repo', repoController(db));
	router.get('/ability', (req, res) => res.json({rules: req.ability.rules}));

	return router
};
