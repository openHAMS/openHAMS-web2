const merge = require('webpack-merge');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const context = path.resolve(__dirname, 'client');

function resolve(paths) {
    return path.resolve(context, paths);
}

const baseConfig = {
    context,
    entry: ['./src/main.js'],
    // TODO: devtools source maps
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client.bundle.js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
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
                // TODO: css source map
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                resolve('src'),
                            ],
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
            },
        ],
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
const webpackHotMiddleware = 'webpack-hot-middleware/client';
const devConfig = merge.smart(baseConfig, {
    mode: 'development',
    entry: [
        webpackHotMiddleware, // include webpack middleware to enable client-side hot reload
    ],
    output: {
        publicPath: '/',
    },
    optimization: {
        noEmitOnErrors: true, // don't bundle on error
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enables client-side hot reload
    ],
});


//
// production configuration
//
const prodConfig = merge.smart(baseConfig, {
    mode: 'production',
});


module.exports = (_, opts) => {
    switch (opts.mode) {
        case 'production':
            return prodConfig;
        default:
            return devConfig;
    }
};
