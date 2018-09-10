const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const baseConfig = {
    entry: ['./server/src/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                options: {
                    emitWarning: true, // emit warnings instead errors
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname),
            'Models': path.resolve(__dirname, './server/src/models'),
        },
    },
    target: 'node',
    externals: [
        nodeExternals(), // exclude node_modules from bundle
    ],
};


//
// development configuration
//
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpackHotPoll = 'webpack/hot/poll?1000';
const devConfig = merge.smartStrategy({ externals: 'replace' })(baseConfig, {
    mode: 'development',
    entry: [
        webpackHotPoll, // include webpack hot reload to enable server-side hot reload
    ],
    //output: {
    //    hotUpdateChunkFilename: 'server-hot/[id].[hash].hot-update.js', // set hot reload chunks' path to 'hot' dir; filename remains default
    //    hotUpdateMainFilename: 'server-hot/[hash].hot-update.json', // set hot reload main file's path to 'hot' dir; filename remains default
    //},
    externals: [
        nodeExternals({
            whitelist: [
                webpackHotPoll, // bundle webpack polling to enable server-side hot reload
            ],
        }),
    ],
    optimization: {
        noEmitOnErrors: true, // don't bundle on error
    },
    plugins: [
        new CleanPlugin(['dist'], {
            beforeEmit: false, // clean before StartServerPlugin
        }),
        new DotenvPlugin(), // bundle environment variables from .env
        new FriendlyErrorsPlugin(),
        new StartServerPlugin({
            name: 'server.bundle.js',
        }), // start server after bundling
        new webpack.HotModuleReplacementPlugin(), // enables server-side hot reload
    ],
    watch: true,
    stats: 'none', // disable console log for friendly errors plugin
    node: {
        __dirname: true, // changes __dirname to the 'context'
    },
});

//
// production configuration
//
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const prodConfig = merge.smart(baseConfig, {
    mode: 'production',
    plugins: [
        //new BundleAnalyzerPlugin(),
    ],
    node: {
        __dirname: false, // changes __dirname to the folder of the running js; the default behavior in nodejs
    },
});


module.exports = (_, opts) => {
    switch (opts.mode) {
        case 'production':
            return prodConfig;
        default:
            return devConfig;
    }
};
