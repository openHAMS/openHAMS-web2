'use strict';
const path = require('path');
const nodeExternals = require('webpack-node-externals');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server-bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
            },
            {
                test: /\.js/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true, //dev
                },
            },
        ],
    },
    context: path.resolve(__dirname),
    target: 'node',
    externals: [nodeExternals()],
};
