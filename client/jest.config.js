/* eslint-env node */
const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname),
    coverageReporters: ['lcov'],
    moduleFileExtensions: [
        'js',
        'vue',
        'json',
    ],
    setupFiles: [
        '<rootDir>/test/jestSetupFetchMock.js',
    ],
};
