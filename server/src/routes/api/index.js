import express from 'express';
import passport from 'passport';

const router = express.Router();
export const auth = [
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


import user from './user';
router.use('/user', auth, user);

import settingsRouter from './settings';
router.use('/settings', auth, settingsRouter);

export default router;
