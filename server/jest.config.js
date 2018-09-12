const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname),
    coverageReporters: ['lcov'],
    moduleFileExtensions: [
        'js',
        'json',
        'vue',
    ],
    moduleNameMapper: {
        '^@server(.*)$': '<rootDir>/src/$1',
    },
};
