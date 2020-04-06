const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require('webpack');
const merge = require("webpack-merge");
const common = require("../webpack.base.js");

module.exports = merge(common, {
	entry: ["./index.js"],
	target: "web",
	node: {
		fs: "empty",
		net: "empty",
		tls: "empty"
	},
	plugins: [
		new Webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({template: "index.html"})
	]
});
