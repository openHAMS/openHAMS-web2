const express = require('express');
const typeis = require('type-is');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = exports.jsonParser = [
    (req, res, next) => {
        if (typeis(req, ['application/json'])) {
            next();
        }
        else {
            res.status(415).send();
        }
    },
    bodyParser.json(),
];


const setDarkTheme = exports.setDarkTheme = async (req, res) => {
    const data = req.body;
    if (!data.hasOwnProperty('darkTheme') || typeof data.darkTheme !== 'boolean') {
        res.status(422).send();
        return;
    }
    req.user.settings.darkTheme = data.darkTheme;
    try {
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(503).send();
    }
};
router.post('/darktheme', jsonParser, setDarkTheme);

exports.router = router;
