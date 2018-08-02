import express from 'express';
const router = express.Router();
import { pick } from 'lodash';

router.get('/user', (req, res) => {
    if (!req.user) {
        res.sendStatus(404);
        return;
    }
    const userData = pick(req.user, ['displayName', 'photos']);
    res.status(200).json(userData);
    return;
});

export default router;
