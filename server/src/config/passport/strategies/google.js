import express from 'express'; // needed for Router
import { Strategy } from 'passport-google-oauth20';
import PassportVerifyFactory from '../utilities/passport-verify-factory';

const options = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
};

const verifyAdapter = {
    strategy: 'google',
    familyName: 'name.familyName',
    givenName: 'name.givenName',
    photo: '_json.image.url',
};

const verify = PassportVerifyFactory(verifyAdapter);

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
