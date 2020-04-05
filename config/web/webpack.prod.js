const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WebpackCleanupPlugin  = require("webpack-cleanup-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.js");

module.exports = merge(common, {
    devtool: "source-map",
    plugins: [
        new WebpackCleanupPlugin(),
        new UglifyJSPlugin({sourceMap: true})
    ]
});
