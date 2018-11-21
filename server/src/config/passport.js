import passport from 'passport';
// strategies
import { GoogleStrategy, GoogleRouter } from './passport/strategies/google';
import { JwtStrategy } from './passport/strategies/jwt';

export default ({ app }) => {
    // google auth
    passport.use(GoogleStrategy);
    app.use('/auth/google', GoogleRouter);
    // jwt auth
    passport.use(JwtStrategy);
    // NOTE: passport is singleton, so every require/import returns the _same_ passport instance
};
