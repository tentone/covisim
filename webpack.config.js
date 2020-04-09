const Path = require("path");
const Webpack = require('webpack');
const context = Path.resolve(__dirname, ".");
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
	],
	module: {
		rules: [
			// JS Code
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules)/,
				use: {loader: "babel-loader"}
			},
			// Text Files
			{
				test: /\.(csv|txt)$/,
				use: {loader: "raw-loader"},
			},
			// HTML Files
			{
				test: /\.html$/,
				use: [
					{loader: "html-loader"}
				]
			},
			/*{
				test: /\.css/,
				use: [
					{loader: "css-loader"}
				]
			},*/
			// Images
			{
				test: /\.(png|svg|jpg|gif|jpeg|css)$/,
				use: [
					{loader: "file-loader"}
				]
			},
			// Fonts
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{loader: "file-loader"}
				]
			},
		],
	}
};
