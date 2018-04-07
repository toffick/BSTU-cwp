const {Router} = require('express');
const commitController = require('./commit');
const {checkAuth} = require('../authorization');

module.exports = (db) => {
	const router = Router({mergeParams: true});

	router.get('/', async (req, res, next) => {
		const authRes = checkAuth(req.ability, 'read', 'repo');
		if (!authRes.access) {
			next(authRes.error);
			return;
		}

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
		const item = await db.Repo.build(req.body);

		const authRes = checkAuth(req.ability, 'create', item);
		if (!authRes.access) {
			next(authRes.error);
			return;
		}

		await item.save();
		res.json(item);
	});

	router.put('/:repoId', async (req, res, next) => {
		const item = await db.Repo.findById(req.params.repoId);

		const authRes = checkAuth(req.ability, 'update', item);
		if (!authRes.access) {
			next(authRes.error);
			return;
		}

		res.json(await item.update(req.body));
	});

	router.delete('/:repoId', async (req, res, next) => {
		const item = await db.Repo.findById(req.params.repoId);

		const authRes = checkAuth(req.ability, 'delete', item);
		if (!item || !authRes.access) {
			next(authRes.error);
			return;
		}

		res.json(await item.destroy());
	});

	router.use('/:repoId/commit', commitController(db));

	return router;
};
