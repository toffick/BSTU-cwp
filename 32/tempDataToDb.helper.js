module.exports = async (db) => {
	await db['Repo'].bulkCreate([
		{
			name: 'BSTU-cwp',
			author: 'toffick'
		},
		{
			name: 'Neogatiate',
			author: 'Antoha'
		},
		{
			name: 'FreeBeer',
			author: 'JohnDoe'
		}
	]);
	await db['Commit'].bulkCreate([
		{
			repoId: 1,
			message: 'init commit',
			hash: '$2a$11$2Pv5yxoGWDNdWtVHRaLgtu5nCO5i3Jmzaybiii3gHuusGPx.gJbvO'
		},
		{
			repoId: 1,
			message: 'little fix of encoding',
			hash: '$2a$11$tZA.Z1C7mZSljilFqeZBZ.rQtA7RU3n0heuGQZ4PWx.mim36pJNOS'
		},
		{
			repoId: 1,
			message: 'cwp done',
			hash: '$2a$11$uU7cjHLlRBObQvxJo.zghurkq6chzKzzF7OnBSs70fk82745HNSR6'
		},
		{
			repoId: 2,
			message: 'init commit',
			hash: '$2a$11$BeBIrN8py6XjT.xb.KD3qO.PoN0ALJMNdE4fX0QjrMF/ba09OkrtW'
		},
		{
			repoId: 2,
			message: 'change config',
			hash: '$2a$11$E2ks07Ene7rDledH45IeJuEqHnYnDW2pG8d4SQkvvfCmQlm8uke/e'
		},
		{
			repoId: 3,
			message: 'init',
			hash: '$2a$11$E2ksscEne7rDledH45IeJuEqHnYnDW2pG8d4SQkvvfCmQlm8uke/e'
		},
		{
			repoId: 3,
			message: 'free beer done',
			hash: '$2a$11hhhks07Ene7rDledH45IeJuEqHnYnDW2pG8d4SQkvvfCmQlm8uke/e'
		}
	]);

};
