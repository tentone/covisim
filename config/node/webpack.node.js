const WebpackNodeExternals = require("webpack-node-externals");
const Merge = require("webpack-merge");
const common = require("../../webpack.config.js");

module.exports = Merge(common, {
	devtool: "source-map",
	entry: ["./node.js"],
	target: "node",
	mode: "development",
	optimization: {
		minimize: false
	},
	externals: [WebpackNodeExternals()],
});
