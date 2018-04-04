const express = require('express');
const path = require('path');

const app = express();
const passport = require('./auth')();

app.set('view engine', 'hbs');

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({
	secret: 'sessio7',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
	res.render('index', {user: req.user});
});

app.get('/login', (req, res)=>{
	res.render('login', {
		user: req.user
	});
});

app.get('/auth/google',
  passport.authenticate('google', { scope: "openid email profile" }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
	  res.redirect('/');
  });


app.get('/account', ensureAuthenticated, function(req, res) {
	res.render('account', {
		user: req.user
	});
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.use('/api/random', (req, res) => {
	const arr = [];
	const count = +req.query.i || 5;

	for (let i = 0; i < count; i++)
		arr.push(Math.random())

	res.status(200).json(arr);
});

app.listen(9000, () => {
	console.log('server listen port 9000');
})
module.exports = app;

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}