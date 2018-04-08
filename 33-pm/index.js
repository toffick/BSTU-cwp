'use strict';

const express = require('express');
const app = express();
const uuid = require('uuid/v4');
const bcrypt = require('bcryptjs');

const port = process.env.PORT || 3000;

app.get('/hash', (req, res) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(uuid(), salt, (err, hash) => {
			res.send(hash);
		});
	});
});

app.listen(port, function () {
	console.log(`Server running on ${port}`);
});
