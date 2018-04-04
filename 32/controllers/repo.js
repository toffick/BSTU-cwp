const {Router} = require('express');

module.exports = (db) => {
	const router = Router({mergeParams: true});

	router.get('/', async (req, res) => res.json(await db.Repo.findAll()));
	router.get('/:repoId', async (req, res) => res.json(await db.Repo.findById(req.params.repoId)));
	router.post('/', async (req, res) => res.json(await db.Repo.create(req.body)));
	router.put('/:repoId', async (req, res) => res.json(await db.Repo.update(req.body, {where: {id: req.params.repoId }, limit: 1})));
	router.delete('/:repoId', async (req, res) => res.json(await db.Repo.destroy({where: {id: req.params.repoId}})));

	router.use('/:repoId/commit', require('./commit')(db));
	return router;
};
