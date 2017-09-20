const webpack = require('webpack');
const {resolve, join} = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCSS = new ExtractTextPlugin('css/style.css');

process.traceDeprecation = true;

module.exports = {
    entry: {
        jquery: 'jquery',
        app: './src/entry.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'modules/[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin({compress: true, exclude: 'jquery'}),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['app', 'jquery'],
            chunksSortMode: function (a, b) {
                if (a.names[0] > b.names[0]) { return -1;}
                if (a.names[0] < b.names[0]) { return 1; }
                return 0;
            },
            minify: {
                collapseWhitespace: false,
                removeComments: true,
                keepClosingSlash: true,
                xhtml: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/write.html',
            filename: 'write.html',
            chunks: ['jquery']
        }),
        new HtmlWebpackPlugin({
            template: './src/view.html',
            filename: 'view.html',
            chunks: ['jquery']
        }),
        ExtractCSS
    ],
    resolve: {
        alias: {
            // 'bxslider': resolve(__dirname, 'node_modules/bxslider/dist/jquery.bxslider.js')
        }
    },
    module: {
        rules: [
            { test: /\.js$/, use: [
                {loader: 'babel-loader', options: {
                    presets: [
                        ['env', {targets: {browsers:['ie 9']}}]
                    ]
                }},
                {loader: 'webpack-strip', options: {strip: ['console.log']}}
            ], exclude: /(node_modules|src\/tpl\/|src\/unit-test\/)/},

            {test: /\.css$/, use: ExtractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {minimize: true}},
                        {loader: 'postcss-loader', options: { plugins: function () { return [ require('autoprefixer')]}}}
                    ],
                    publicPath: '../'
                })
            },
            { test: /\.(jpe?g|gif|png)$/, use: [
                {loader: 'file-loader', options: {name: '[folder]/[name].[ext]'}},
                {loader: 'image-webpack-loader',
					options: {
                        mozjpeg: {progressive: true},
                        gifsicle: {interlaced: true},
                        optipng: { optimizationLevel: 7}
                    }
				}
            ]},
            { test: /\.html$/, use: [
                {loader: 'html-loader', options: {attrs: ['img:src']}}
            ]},
            { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery!expose-loader?window.$!expose-loader?window.jQuery'}
        ]
    }
};