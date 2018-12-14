// setup express & express.Router mock
jest.mock('express', () => ({
    ...require('jest-express'),
    Router: jest.fn(),
}));
import express from 'express';
import { Request, Response } from 'jest-express';
// create single Router mock instance
const router = require('jest-express').Router();
// setup user methods
router.request.user = {
    toApiObject: jest.fn(),
};
// set mock to return always the same router instance
express.Router.mockImplementation(() => router);

// setup passport mock
jest.mock('passport', () => ({
    authenticate: jest.fn(),
}));
import passport from 'passport';
const authenticateObject = new Object();
passport.authenticate.mockImplementation(() => authenticateObject);

// setup settings router mock
jest.mock('@/routes/api/settings', () => jest.fn());

// use require to ensure synchronous (immediate) load
const {
    default: userRouter,
    getUser,
} = require('@/routes/api/user');


describe('User api route', () => {
    it('returns Router', () => {
        expect(userRouter).toBe(express.Router());
    });

    describe('GET /', () => {
        it('exists', () => {
            expect(router.get).toHaveBeenCalledWith('/', getUser);
        });

        it('calls res.status(200).json() with the value of req.user.toApiObject()', () => {
            const apiObject = new Object();
            const req = new Request('/');
            req.user = {
                toApiObject: jest.fn(() => apiObject),
            };
            const res = new Response();
            getUser(req, res);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(apiObject);
        });
    });
});
