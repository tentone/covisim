const path = require("path");
const context = path.resolve(__dirname, "../..");
const src = context + "/src";
const dist = context + "/dist";
const nodeExternals = require("webpack-node-externals");

module.exports = {
	context: src,
	entry: ["./node.js"],
	target: "node",
	output: {
		filename: "bundle.js",
		path: dist
	},
	externals: [nodeExternals()],
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
	},
	resolve: {
		modules: [src, "node_modules"]
	},
	plugins: []
};
