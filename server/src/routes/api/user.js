import express from 'express';

const router = express.Router();


export const getUser = (req, res) => {
    const profile = req.user.toApiObject();
    res.status(200).json(profile);
};
router.get('/', getUser);

export default router;
