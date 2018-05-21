const path = require('path');
const webpack = require('webpack');

const _path = './dist';

module.exports = {
	entry: {
		app: './index.jsx',
	},
	output: {
		path: __dirname + _path,
		filename: 'app.es5.js',
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'babel-preset-env',
						'babel-preset-react',
					]
				}
			},
			],
	},
	resolve: {
		modules: [
			path.resolve('src'),
			'node_modules',
		],
		extensions: ['.js', '.jsx', '.json'],
	},
	plugins: [
		// new CleanWebpackPlugin(['dist']),
		// HTMLWebpackPluginConfig,
		// extractSass,
	],
};
