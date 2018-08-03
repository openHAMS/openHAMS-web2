import express from 'express';
import { pick } from 'lodash';

export default () => {
    const router = express.Router();
    router.get('/user', (req, res) => {
        if (!req.user) {
            return res.sendStatus(404);
        }
        const userData = pick(req.user, ['displayName', 'photos']);
        return res.status(200).json(userData);
    });
    return router;
};
