const WebpackCleanupPlugin  = require("webpack-cleanup-plugin");
const WebpackNodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const common = require("../webpack.base.js");

module.exports = merge(common, {
	entry: ["./node.js"],
	target: "node",
	mode: "development",
	optimization: {
		minimize: false
	},
	externals: [WebpackNodeExternals()],
	plugins: [
		new WebpackCleanupPlugin(),
	]
});
