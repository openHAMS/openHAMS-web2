import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
    const profile = req.user.toApiObject();
    res.status(200).json(profile);
});

export default router;
