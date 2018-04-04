const { Router }  = require('express');

module.exports = (db)=>{
	const router = Router({mergeParams: true});

	router.get('/', async (req, res) => res.json(await db.Commit.findAll()));
	router.get('/:repoId', async (req, res) => res.json(await db.Repo.findAll({where: {repoId: req.params.repoId, id: req.params.id}, limit: 1})));
	router.post('/', async (req, res) => res.json(await db.Commit.create(req.body)));
	router.put('/:repoId', async (req, res) => res.json(await db.Commit.update(req.body, {where: {id: req.params.repoId }, limit: 1})));
	router.delete('/:repoId', async (req, res) => res.json(await db.Commit.destroy({where: {id: req.params.repoId}})));

	return router
};
