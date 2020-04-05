const WebpackCleanupPlugin  = require("webpack-cleanup-plugin");
const WebpackNodeExternals = require("webpack-node-externals");
const Path = require("path");

const context = Path.resolve(__dirname, "../..");
const src = context + "/src";
const dist = context + "/dist";

module.exports = {
	context: src,
	entry: ["./node.js"],
	target: "node",
	optimization: {
		minimize: false
	},
	output: {
		filename: "bundle.js",
		path: dist
	},
	mode: "development",
	externals: [WebpackNodeExternals()],
	resolve: {
		modules: [src, "node_modules"]
	},
	plugins: [
		new WebpackCleanupPlugin(),
	],
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
				test: /\.csv$/,
				use: "raw-loader",
			}
		],
	}
};
