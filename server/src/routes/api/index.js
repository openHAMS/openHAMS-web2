import express from 'express';
import passport from 'passport';

const router = express.Router();
const auth = [
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        if (req.user) {
            next();
        }
        else {
            res.sendStatus(401);
        }
    },
];


import user from './user';
router.use('/user', auth, user);

import settingsRouter from './settings';
router.use('/settings', auth, settingsRouter);

export default router;
