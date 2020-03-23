const path = require('path');
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const webpack = require('webpack');

module.exports = merge(commonConfig, {

    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'dist'),
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement
        https: false, // true for self-signed, object for cert authority
        noInfo: true // only errors & warns on hot reload
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})