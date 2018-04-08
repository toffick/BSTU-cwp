const siege = require('siege');
siege()
		.on(3000)
		.concurrent(50)
		.get('/hash').for(10).seconds
		.attack()
