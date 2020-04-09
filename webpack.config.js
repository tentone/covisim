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
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules)/,
				use: {loader: "babel-loader"}
			},
			{
				test: /\.(csv|txt)$/,
				use: {loader: "raw-loader"},
			},
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
			{
				test: /\.(png|svg|jpg|gif|jpeg|css)$/,
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
