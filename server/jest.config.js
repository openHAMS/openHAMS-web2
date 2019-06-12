const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname),
    coverageReporters: ['lcov'],
    moduleFileExtensions: [
        'js',
        'json',
    ],
    moduleNameMapper: {
        '@/(.+)$': '<rootDir>/src/$1',
        '~testdata/(.+)$': '<rootDir>/test/__testdata__/$1',
    },
    testEnvironment: 'node',
};
