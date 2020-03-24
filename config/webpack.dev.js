const path = require('path');
const merge = require("webpack-merge");
const webpack = require('webpack');
const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
    devtool: 'inline-source-map',
    optimization: {
        minimize: false
    },
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})
