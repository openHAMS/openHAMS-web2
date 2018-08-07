const path = require('path');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

module.exports = {
    target: 'node',
    entry: ['./src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server-bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src')],
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: eslintFriendlyFormatter,
                    emitWarning: true, //dev
                },
            },
        ],
    },
    resolve: {
        alias: {
            'Models': path.resolve(__dirname, 'src/models'),
        },
    },
    context: path.resolve(__dirname),
};
