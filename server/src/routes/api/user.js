import express from 'express';
import passport from 'passport';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
});

router.get('/', (req, res) => {
    const profile = req.user.toApiObject();
    res.status(200).json(profile);
});

export default router;
