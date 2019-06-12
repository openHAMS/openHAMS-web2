const express = require('express'); // needed for Router
const { Strategy } = require('passport-google-oauth20');
const PassportVerifyFactory = require('../utilities/passport-verify-factory');

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

exports.GoogleStrategy = new Strategy(options, verify);

const passport = require('passport');

const GoogleRouter = express.Router();
GoogleRouter.get('/',
    passport.authenticate('google', {
        scope: ['openid email profile'],
    }));
GoogleRouter.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false,
    }),
    (req, res) => {
        // Authentication successful
        // set jwt cookie
        res.cookie('jwt', req.user.getJwt());
        res.redirect('/');
    });
exports.GoogleRouter = GoogleRouter;
