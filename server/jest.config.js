const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname),
    coverageReporters: ['lcov'],
    moduleFileExtensions: [
        'js',
        'json',
    ],
    moduleNameMapper: {
        '^@server(.*)$': '<rootDir>/src/$1',
    },
};
