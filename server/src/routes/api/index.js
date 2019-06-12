const express = require('express');
const passport = require('passport');

const router = express.Router();
const auth = exports.auth = [
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        if (req.user) {
            next();
        }
        else {
            res.status(401).send();
        }
    },
];


const user = require('./user').router;
router.use('/user', auth, user);

const settingsRouter = require('./settings').router;
router.use('/settings', auth, settingsRouter);

exports.router = router;
