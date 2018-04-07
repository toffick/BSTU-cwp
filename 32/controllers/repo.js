const {Router} = require('express');
const commitController = require('./commit');
const {checkAuth} = require('../authorization');
const {ability} = require('../authorization');

// сука, либа странная, заебся думать, как это припилить
module.exports = (db) => {
	const router = Router({mergeParams: true});

	router.get('/', async (req, res, next) => {
		res.json(await db.Repo.findAll());
	});

	router.get('/:repoId', async (req, res, next) => {
		const item = await db.Repo.findById(req.params.repoId);

		const authRes = checkAuth(req.ability, 'read', item);
		if (!authRes.access) {
			next(authRes.error);
			return;
		}

		res.json(item);
	});

	router.post('/', async (req, res, next) => {
		const item = await db.Repo.create(req.body);

		const authRes = checkAuth(req.ability, 'create', item);
		if (!authRes.access) {
			next(authRes.error);
			return;
		}

		res.json(item);
	});

	router.put('/:repoId', async (req, res, next) => {
		const item = await db.Repo.findById(req.params.repoId);

		const authRes = checkAuth(req.ability, 'update', item);
		if (!authRes.access) {
			next(authRes.error);
			return;
		}

		const changedItem = await item.update(req.body);

		res.json(changedItem);
	});

	router.delete('/:repoId', async (req, res, next) => {
		const item = await db.Repo.findById(req.params.repoId);

		const authRes = checkAuth(req.ability, 'delete', item);
		if (!authRes.access) {
			next(authRes.error);
			return;
		}

		res.json(await item.destroy());
	});

	router.use('/:repoId/commit', ability(), commitController(db));

	return router;
};
