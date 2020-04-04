const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require('webpack');

const context = path.resolve(__dirname, "..");
const src = context + "/src";
const dist = context + "/dist";

module.exports = {
	context: src,
	entry: ["./index.js"],
	output: {
		filename: "bundle.js",
		path: dist
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: "babel-loader",
						options: {presets: ["env"],}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {modules: true}
					}
				]
			},
			{
				test: /\.csv$/,
				use: "raw-loader",
			},
			{
				test: /\.(png|svg|jpg|gif|jpeg|xlsx)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							emitFile: true,
						}
					}
				]
			}
		],
	},
	resolve: {
		modules: [src, "node_modules"]
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({title: "Covid19", template: "index.html"})
	]
};
