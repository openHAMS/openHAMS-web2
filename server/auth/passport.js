'use strict';

const passport = require('passport');
// strategies
const {Strategy : GoogleStrategy, RouterGenerator : GoogleRouterGenerator} = require('./google');

passport.serializeUser(function(user, done) {
    // done(null, user.id);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    // Users.findById(obj, done);
    done(null, obj);
});

passport.use(GoogleStrategy);

var googleRouter = GoogleRouterGenerator(passport);

exports.GoogleRouter = googleRouter;
