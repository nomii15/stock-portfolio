const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const existingUser = await User.findById(jwt_payload.id);
      if (existingUser) {
        return done(null, existingUser);
      }
      return done(null, false);
    } catch (err) {
      console.log(err);
    }
  }),
);
