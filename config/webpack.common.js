const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env"],
					}
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", {
					loader: "css-loader",
					options: {
						modules: true
					}
				}]
			},
			{
				test: /\.(png|svg|jpg|gif|csv)$/,
				use: [
					"file-loader"
				]
			}
		],
	},
	resolve: {
		modules: [src, "node_modules"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Covid19",
			template: "index.html"
		})
	]
};
