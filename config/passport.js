const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { SECRET_KEY } = require('./keys');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, async (jwtPayload, done) => {
			const user = await User.findById(jwtPayload.id);
			try {
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			} catch (er) {
				console.log(er);
			}
		})
	);
};
