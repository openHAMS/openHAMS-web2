import express from 'express';
import typeis from 'type-is';
import bodyParser from 'body-parser';

const router = express.Router();
export const jsonParser = [
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


export const setDarkTheme = async (req, res) => {
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

export default router;
