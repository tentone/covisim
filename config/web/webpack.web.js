const HtmlWebpackPlugin = require("html-webpack-plugin");
const Merge = require("webpack-merge");
const Path = require("path");
const common = require("../../webpack.config.js");

module.exports = Merge(common, {
	entry: ["./index.js"],
	target: "web",
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	},
	plugins: [
		new HtmlWebpackPlugin({template: Path.resolve(__dirname, '../../src', 'index.html'), filename: "index.html"})
	]
});
