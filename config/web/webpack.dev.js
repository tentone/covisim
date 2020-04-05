const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.js");

module.exports = merge(common, {
    devtool: "inline-source-map",
    optimization: {
        minimize: false
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: false
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})
