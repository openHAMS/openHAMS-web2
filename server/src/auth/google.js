// enviromental variables from .env file
require('dotenv').config();
// passport.js strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const options = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

function verify(accessToken, refreshToken, profile, done) {
    if (profile.id !== process.env.ADMIN_ID) {
        return done(null, false, { message: 'Authentication failed.' });
    }
    return done(null, profile);
}

exports.Strategy = new GoogleStrategy(options, verify);


exports.RouterGenerator = (passport) => {
    const express = require('express');
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
            // Authenticated successfully
            res.redirect('/');
        });
    return router;
};
