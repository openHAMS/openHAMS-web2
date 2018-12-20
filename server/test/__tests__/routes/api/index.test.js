// setup express & express.Router mock
jest.mock('express', () => ({
    ...require('jest-express'),
    Router: jest.fn(),
}));
import express from 'express';
// create single Router mock instance
const router = require('jest-express').Router();
// set mock to return always the same router instance
express.Router.mockImplementation(() => router);

// setup passport mock
jest.mock('passport', () => ({
    authenticate: jest.fn(),
}));
import passport from 'passport';
const authenticateObject = new Object();
passport.authenticate.mockImplementation(() => authenticateObject);

// setup api mocks
// settings
jest.mock('@/routes/api/settings', () => jest.fn());
import settingsApi from '@/routes/api/settings';
settingsApi.mockImplementation(() => new Object());
// user
jest.mock('@/routes/api/user', () => jest.fn());
import userApi from '@/routes/api/user';
userApi.mockImplementation(() => new Object());

// use require to ensure synchronous (immediate) load
const {
    auth,
} = require('@/routes/api/index');


describe('Main api route', () => {
    describe('auth middleware', () => {

        it('is in correct order', () => {
            expect(auth).toEqual([authenticateObject, expect.any(Function)]);
        });

        it('passport.authenticate is called with proper parameters', () => {
            expect(passport.authenticate).toHaveBeenCalledWith('jwt', { session: false });
        });

        describe('filter function', () => {
            const [, filterFn] = auth;

            it('calls mext() if req.user available', () => {
                const req = new express.Request();
                req.user = new Object();
                const res = new express.Response();
                const next = jest.fn();
                filterFn(req, res, next);
                expect(next).toHaveBeenCalledTimes(1);
                expect(res.status).not.toHaveBeenCalled();
                expect(res.send).not.toHaveBeenCalled();
            });

            it('calls res.status(401).send() if no req.user available', () => {
                const req = new express.Request();
                req.user = null;
                const res = new express.Response();
                const next = jest.fn();
                filterFn(req, res, next);
                expect(next).not.toHaveBeenCalled();
                expect(res.status).toHaveBeenCalledWith(401);
                expect(res.send).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('loads settings api under /settings', () => {
        expect(router.use).toHaveBeenCalledWith('/settings', auth, settingsApi);
    });

    it('loads user api under /user', () => {
        expect(router.use).toHaveBeenCalledWith('/user', auth, userApi);
    });
});
