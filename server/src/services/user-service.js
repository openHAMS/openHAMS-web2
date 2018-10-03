import express from 'express';

export default () => {
    const router = express.Router();
    router.get('/user', (req, res) => {
        if (!req.user) {
            return res.sendStatus(401);
        }
        const userData = req.user;
        return res.status(200).json(userData);
    });
    return router;
};
