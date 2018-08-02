import passport from 'passport';
import userService from '../services/user-service';

// strategies
import { GoogleStrategy, GoogleRouterGenerator } from './passport-strategies/google';

function setupUserSerialization() {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

export default ({ app }) => {
    setupUserSerialization();
    app.use(passport.initialize());
    app.use(passport.session());
    // google auth
    passport.use(GoogleStrategy);
    const GoogleRouter = GoogleRouterGenerator(passport);
    app.use('/auth', GoogleRouter);
    // user routing
    app.use('/api', userService);
    return passport;
};
