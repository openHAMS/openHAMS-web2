import express from 'express'; // needed for Router
import { Strategy } from 'passport-google-oauth20';

const options = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

function verify(accessToken, refreshToken, profile, done) {
    if (profile.id === process.env.ADMIN_ID) {
        return done(null, profile);
    }
    return done(null, false, { message: 'Authentication failed.' });
}

export const GoogleStrategy = new Strategy(options, verify);

export function GoogleRouterGenerator (passport) {
    const router = express.Router();
    router.get('/google',
        passport.authenticate('google', {
            scope: ['openid email profile'],
        }));
    router.get('/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login',
        }),
        (req, res) => {
            // Authentication successful
            res.redirect('/');
        });
    return router;
}
