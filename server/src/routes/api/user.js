const express = require('express');

const router = express.Router();


const getUser = exports.getUser = (req, res) => {
    const profile = req.user.toApiObject();
    res.status(200).json(profile);
};
router.get('/', getUser);

exports.router = router;
