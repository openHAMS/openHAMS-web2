const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname),
    coverageReporters: ['lcov'],
    moduleFileExtensions: [
        'js',
        'json',
    ],
    'moduleNameMapper': {
        '~testdata/(.*)$': '<rootDir>/__testdata__/$1',
    },
};
