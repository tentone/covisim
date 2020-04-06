const HtmlWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");
const Webpack = require('webpack');

const context = Path.resolve(__dirname, "..");
const src = context + "/src";
const dist = context + "/dist";

module.exports = {
	context: src,
	output: {
		filename: "bundle.js",
		path: dist
	},
	resolve: {
		modules: [src, "node_modules"]
	},
	plugins: [
		new Webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({template: "index.html"})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: {loader: "babel-loader"}
			},
			{
				test: /\.csv$/,
				use: {loader: "raw-loader"},
			},
			{
				test: /\.html$/,
				use: [
					{loader: "html-loader"}
				]
			},
			{
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: {
					loader: "file-loader",
					options: {
						name: "[path][name].[ext]",
						emitFile: true,
					}
				}
			}
		],
	}
};
