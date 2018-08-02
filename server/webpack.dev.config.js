const webpack = require('webpack');
const merge = require('webpack-merge');
// plugins
const CleanPlugin = require('clean-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
// externals
const nodeExternals = require('webpack-node-externals');
// node desktop notification
const notifier = require('node-notifier');
// common webpack config
const baseConfig = require('./webpack.base.config');

const webpackPoll = 'webpack/hot/poll?1000';

module.exports = merge(baseConfig, {
    mode: 'development', // sets NODE_ENV to 'development', enables NamedChunksPlugin & NamedModulesPlugin
    entry: [webpackPoll], // include webpack polling into bundle to use hotreload/watch
    devtool: 'none', // no need for backend
    externals: [
        nodeExternals({
            whitelist: [webpackPoll], // do not exclude webpack polling - it works only if included into bundle
        }), // exclude modules from 'node_modules'
    ],
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true),
        }),
        new webpack.HotModuleReplacementPlugin(), // enable hot reload (both server and client)
        new webpack.NoEmitOnErrorsPlugin(), // prevent (hot)reload if code has errors (ie. not compiles)
        new CleanPlugin(baseConfig.output.filename, {
            beforeEmit: true, // run clean before emitting to output; clean before StartServerPlugin
        }), // clean bundle
        new DotenvPlugin(),
        new FriendlyErrorsPlugin({
            onErrors: (severity, errors) => {
                if (severity !== 'error') {
                    return;
                }
                const [error] = errors;
                notifier.notify({
                    title: 'Webpack error',
                    message: `${severity}: ${error.name}`,
                    subtitle: error.file || '',
                });
            },
        }), // clean terminal dashboard when running - also 'yarn dev' uses '--display none' to enable quet mode
        new StartServerPlugin(), // auto start server on/after bundle built
    ],
    watch: true,
});
