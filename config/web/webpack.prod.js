const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WebpackCleanupPlugin  = require("webpack-cleanup-plugin");
const Merge = require("webpack-merge");
const common = require("./webpack.web.js");

module.exports = Merge(common, {
    devtool: "source-map",
    mode: "production",
    plugins: [
        new WebpackCleanupPlugin(),
        new UglifyJSPlugin({sourceMap: false})
    ]
});
