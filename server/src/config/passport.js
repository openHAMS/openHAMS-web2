import passport from 'passport';
// strategies
import { GoogleStrategy, GoogleRouter } from './passport/strategies/google';
import User from 'Models/User';

function setupUserSerialization() {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (userId, done) => {
        const user = await User.findById(userId).exec();
        done(null, user);
    });
}
import { JwtStrategy } from './passport/strategies/jwt';

export default ({ app }) => {
    setupUserSerialization();
    app.use(passport.initialize());
    app.use(passport.session());
    // google auth
    passport.use(GoogleStrategy);
    app.use('/auth/google', GoogleRouter);
    // jwt auth
    passport.use(JwtStrategy);
    // NOTE: passport is singleton, so every require/import returns the _same_ passport instance
};
