const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Mounting
app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(9001, () => console.log('Running'));
