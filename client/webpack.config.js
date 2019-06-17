const merge = require('webpack-merge');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const context = path.resolve(__dirname);

function resolve(paths) {
    return path.resolve(context, paths);
}

const baseConfig = {
    context,
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client.bundle.js',
    },
    module: {
        rules: [ // NOTE TO SELF: loader runs backwards (right to left, bottom to top)
            {
                enforce: 'pre', // needed for eslint
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                include: [
                    resolve('src'),
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                options: {
                    configFile: resolve('.babelrc'), // somehow babel cannot find babelrc without this in client cfg...
                },
            },
            {
                test: /\.s?css$/,
                //exclude: ['/node_modules'],
                use: [
                    {
                        loader: 'vue-style-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            includePaths: [
                                resolve('src'), // needed to resolve via @import
                            ],
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader',
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash].[ext]',
                    outputPath: 'assets/fonts/',
                },
            }],
    },
    resolve: {
        extensions: [
            '.js',
            '.vue',
            '.json',
        ],
        // alias definitions in closest .babelrc
    },
    plugins: [
        new CleanPlugin(),
        new HtmlPlugin({
            template: './index.html',
        }),
        new VueLoaderPlugin(),
    ],
};


//
// development configuration
//
const webpack = require('webpack');
//const webpackHotMiddleware = 'webpack-hot-middleware/client';
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const devConfig = merge.smart(baseConfig, {
    mode: 'development',
    //entry: [
    //    webpackHotMiddleware, // include webpack middleware to enable client-side hot reload
    //],
    output: {
        publicPath: '/',
    },
    optimization: {
        noEmitOnErrors: true, // don't bundle on error
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: resolve('./dist'),
        hot: true,
        port: 3000,
        proxy: {
            '/api': 'http://localhost:8080',
            '/auth': 'http://localhost:8080',
        },
        quiet: true, // disabled for friendly-errors-webpack-plugin
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enables client-side hot reload
        new FriendlyErrorsPlugin({
            onErrors: (severity, errors) => { // windows notifications on-error
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: 'Webpack error',
                    message: `${severity}${error.name}`,
                    subtitle: error.file || '',
                });
            },
        }),
    ],
});


//
// production configuration
//
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const prodConfig = merge.smart(baseConfig, {
    mode: 'production',
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});


module.exports = (_, opts) => {
    switch (opts.mode) {
        case 'production':
            return prodConfig;
        default:
            return devConfig;
    }
};
