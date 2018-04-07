const {Router} = require('express');
const {checkAuth} = require('../authorization');

module.exports = (db) => {
	const router = Router({mergeParams: true});

	router.get('/', async (req, res, next) => {
		const repo = await db.Repo.findById(req.params.repoId);

		res.json(await repo.getCommits())
	});

	router.get('/:commitId', async (req, res, next) => {
		const item = (await db.Commit.findAll({where: {repoId: req.params.repoId, id: req.params.commitId}, limit: 1}))[0];

		const authRes = checkAuth(req.ability, 'read', item);
		if (item && !authRes.access) {
			next(authRes.error);
			return;
		}

		res.json(item);
	});

	router.post('/', async (req, res, next) => {
		const {repoId} = req.params;
		const commit = await db.Commit.create({repoId, ...req.body});

		const authRes = checkAuth(req.ability, 'create', commit);
		if (!authRes.access) {
			next(authRes.error);
			return;
		}

		res.json(commit);
	});

	router.put('/:commitId', async (req, res, next) => res.json(await db.Commit.update(req.body, {
		where: {
			repoId: req.params.repoId,
			id: req.params.commitId
		}, limit: 1
	})));

	router.delete('/:commitId', async (req, res, next) => res.json(await db.Commit.destroy({
		where: {
			repoId: req.params.repoId,
			id: req.params.commitId
		}
	})));

	return router
};
