const config = require('./config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = () => {

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	passport.use(new GoogleStrategy(
	  config,
	  function(accessToken, refreshToken, profile, done) {
		  console.log(profile);

		  return done(null, profile);
	  }
	));

	return passport;
}