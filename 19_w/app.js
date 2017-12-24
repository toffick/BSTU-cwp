const express = require('express');
const bodyParser = require('body-parser');
const validation = require('./validation')();

const app = express();

app.use(bodyParser.json());
app.use(validation);
app.post('/signin', (req, res, next) =>{
    res.json(req.validation)
});

app.post('/signup', (req, res, next) =>{
    res.json(req.validation)
});

app.post('/drinks', (req, res, next) =>{
    res.json(req.validation)
});

app.post('/recipes', (req, res, next) =>{
    res.json(req.validation)
});



app.use(function (err, req, res, next){
    console.log(err);
    res.status(err.status || 500);
    res.end(err.message);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));