const merge = require('webpack-merge');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const baseConfig = {
    entry: ['./client/src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve(__dirname, 'client/.babelrc'), // somehow babel cannot find babelrc without this in client cfg...
                },
            },
            {
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
                    'sass-loader',
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '~': path.resolve(__dirname),
            '@': path.resolve(__dirname, 'client/src'),
            'vue$': 'vue/dist/vue.esm.js', // use full ES Vue instead default runtime ES Vue
            'vuetify.css$': path.resolve(__dirname, 'node_modules/vuetify/dist/vuetify.css'),
            'Assets': path.resolve(__dirname, 'client/src/assets'),
            'Utils': path.resolve(__dirname, 'client/src/utils'),
        },
    },
    plugins: [
        new HtmlPlugin({
            template: './client/index.html',
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
