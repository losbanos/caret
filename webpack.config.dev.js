const webpack = require('webpack');
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBrowserPlugin = require('webpack-browser-plugin');

process.noDeprecation = true
module.exports = {
    devtool: 'eval-source-map',
    entry: {
        jquery: 'jquery',
        app: './src/entry.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'modules/[name].[hash].js'
    },
    devServer: {
        port: 9002, compress: true,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['jquery', 'app'],
            chunksSortMode: function (a, b) {
                if(a.names[0] > b.names[0]) { return -1;}
                if(a.names[0] < b.names[0]) {return 1;}
                return 0;
            }
        }),
        new WebpackBrowserPlugin()
    ],
    module: {
        rules: [
            { test: /\.js$/, use: [
                {loader: 'babel-loader', options: {
                    presets: [
                        ['env', {targets: {browsers: ['last 2 versions', '> 10%', 'ie 9']}}]
                    ]
                }}
            ], exclude: /(node_modules|src\/tpl\/|src\/unit-test\/)/ },
            {test: /\.css$/, use: [
                {loader: 'style-loader'},
                {loader: 'css-loader', options: {sourceMap: false, publicPath: '../'}},
                {loader: 'postcss-loader', options:{plugins: function () { return [require('autoprefixer')]}}}
            ]},
            {test: /\.(jpe?g|gif|png)$/, use:[{loader: 'file-loader', options: {name: 'images/[folder]/[name].[ext]'}}]},
            {test: /\.html$/, use: [
                // {loader: 'html-loader', options: {attrs: ['img:src']}},
                {loader: 'raw-loader'}
                ],
                exclude: /(node_modules|src\/tpl\/|src\/unit-test\/)/},
            {test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery!expose-loader?window.$!expose-loader?window.jQuery'}
        ]
    }
};