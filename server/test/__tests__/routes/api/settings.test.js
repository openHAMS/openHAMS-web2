// setup express & express.Router mock
jest.mock('express', () => ({
    ...require('jest-express'),
    Router: jest.fn(),
}));
const express = require('express');
// create single Router mock instance
const router = require('jest-express').Router();
// set mock to return always the same router instance
express.Router.mockImplementation(() => router);

jest.mock('type-is');
jest.mock('body-parser', () => ({
    json: jest.fn(() => jest.fn()),
}));

// use require to ensure synchronous (immediate) load
const {
    // default: settingsRouter,
    jsonParser,
    setDarkTheme,
} = require('@/routes/api/settings');


// TODO: test this
describe('Settings api route', () => {
    // it('returns Router', () => {
    //     expect(express.Router()).toBeInstanceOf(express.Router);
    // });

    describe('POST /darktheme', () => {
        it('exists', () => {
            expect(router.post).toHaveBeenCalledWith('/darktheme', jsonParser, setDarkTheme);
        });
    });
});
