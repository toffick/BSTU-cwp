const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: path.resolve('source/index.jsx'),
		vendor: ['babel-polyfill', 'react', 'react-dom', 'axios']
	},
	devtool: 'source-map',

	output: {
		path: path.resolve(__dirname, 'public'),
		chunkFilename: '[name].js',
		filename: '[name].js',
		publicPath: '.'
	},
	// mode: 'production',
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css-loader', 'postcss-loader')
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx', '.json'],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: 'vendor',
					name: 'vendor',
					enforce: true,
					chunks: 'all'
				}
			}
		},
		// minimize: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './source/assets/index.html',
			inject: 'body'
		}),
		new ExtractTextPlugin({
			filename: 'app.css',
			disable: false,
			allChunks: true
		}),
		// new CssoWebpackPlugin()
	]
};
