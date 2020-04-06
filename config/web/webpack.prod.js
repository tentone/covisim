const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WebpackCleanupPlugin  = require("webpack-cleanup-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.web.js");

module.exports = merge(common, {
    devtool: "source-map",
    mode: "production",
    plugins: [
        new WebpackCleanupPlugin(),
        new UglifyJSPlugin({sourceMap: false})
    ]
});
