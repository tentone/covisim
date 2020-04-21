const Path = require("path");
const Webpack = require('webpack');
const context = Path.resolve(__dirname, ".");
const src = context + "/src";
const dist = context + "/docs";

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
				loader: "babel-loader"
			},
			// Text Files
			{
				test: /\.(csv|txt)$/,
				loader: "raw-loader",
			},
			// HTML Files
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			// Images
			{
				test: /\.(png|svg|jpg|gif|jpeg|css)$/,
				loader: "file-loader",
				options: {
					emitFile: true,
					esModule: false,
					name: '[name].[ext]',
				},
			},
			// Fonts
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader"
			},
		],
	}
};
