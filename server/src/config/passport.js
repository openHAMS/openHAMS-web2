const passport = require('passport');
// strategies
const { GoogleStrategy, GoogleRouter } = require('./passport/strategies/google');
const { JwtStrategy } = require('./passport/strategies/jwt');

module.exports = ({ app }) => {
    // google auth
    passport.use(GoogleStrategy);
    app.use('/auth/google', GoogleRouter);
    // jwt auth
    passport.use(JwtStrategy);
    // NOTE: passport is singleton, so every require/import returns the _same_ passport instance
};
