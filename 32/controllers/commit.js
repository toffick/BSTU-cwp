const {Router} = require('express');
const {checkAuth} = require('../authorization');

module.exports = (db) => {
	const router = Router({mergeParams: true});

	router.get('/', async (req, res, next) => {
		const repo = await db.Repo.findById(req.params.repoId);

		res.json(await repo.getCommits())
	});

	router.get('/:commitId', async (req, res, next) => {
		const {repoId, commitId} = req.params;

		const repo = await db.Repo.findById(repoId);

		const authCheckRepo = checkAuth(req.ability, 'read', 'commit');
		if (repo && !authCheckRepo.access) {
			next(authCheckRepo.error);
			return;
		}

		res.json(await repo.getCommits({where: {id: commitId}}));
	});

	router.post('/', async (req, res, next) => {
		const {repoId} = req.params;
		const repo = await db.Repo.findById(repoId);

		const authCheckRepo = checkAuth(req.ability, 'update', repo);
		if (repo && !authCheckRepo.access) {
			next(authCheckRepo.error);
			return;
		}

		const commit = await db.Commit.build({repoId, ...req.body});
		const authCheckCommit = checkAuth(req.ability, 'create', commit);
		if (commit && !authCheckCommit.access) {
			next(authCheckCommit.error);
			return;
		}

		await commit.save();
		res.json(commit);
	});

	router.put('/:commitId', async (req, res, next) => {
		const {repoId, commitId} = req.params;

		const repo = await db.Repo.findById(repoId);
		const authCheckRepo = checkAuth(req.ability, 'update', repo);
		if (repo && !authCheckRepo.access) {
			next(authCheckRepo.error);
			return;
		}

		const commit = (await repo.getCommits({where: {id: commitId}}))[0];
		const authCheckCommit = checkAuth(req.ability, 'update', commit);
		if (commit && !authCheckCommit.access) {
			next(authCheckCommit.error);
			return;
		}

		res.json(await commit.update({repoId, ...req.body}));
	});

	router.delete('/:commitId', async (req, res, next) => {

		const commit = await db.Commit.findById(req.params.commitId);

		const authRes = checkAuth(req.ability, 'delete', commit);
		if (!commit || !authRes.access) {
			next(authRes.error);
			return;
		}

		res.json(await commit.destroy());
	});

	return router
};
