const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		// 'babel-polyfill',
		'./src/index.js',
	],
	output: {
		path: __dirname + '/dist',
		filename: 'app.[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react', 'stage-0'],
				},
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
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
};
