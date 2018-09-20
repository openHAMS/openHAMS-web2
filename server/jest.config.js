const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname),
    coverageReporters: ['lcov'],
    moduleFileExtensions: [
        'js',
        'json',
    ],
};
