const passport = require('passport');
// strategies
const { Strategy: GoogleStrategy, RouterGenerator: GoogleRouterGenerator } = require('./google');

passport.serializeUser((user, done) => {
    // done(null, user.id);
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    // Users.findById(obj, done);
    done(null, obj);
});

passport.use(GoogleStrategy);

const googleRouter = GoogleRouterGenerator(passport);

exports.GoogleRouter = googleRouter;
