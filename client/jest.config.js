/* eslint-env node */
const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname),
    clearMocks: true,
    coverageReporters: ['lcov'],
    moduleFileExtensions: [
        'js',
        'vue',
        'json',
    ],
    setupFiles: [
        'jest-localstorage-mock',
        '<rootDir>/test/jest-fetch-mock.js',
    ],
};
