const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, 'src/'),
	entry: './index.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	devtool: 'source-map',
	devServer: {
		port: 5000,
		contentBase: path.join(__dirname, '/public'),
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [{
					loader: 'style-loader', // creates style nodes from JS strings
				}, {
					loader: 'css-loader', // translates CSS into CommonJS
				}, {
					loader: 'sass-loader', // compiles Sass to CSS
				}],
			},
			{
				test: /.js?$/,
				loader: 'babel-loader',
				include: [path.join(__dirname, 'src')],
				query: {
					presets: ['es2015', 'react', 'stage-0'],
				},
			},
			{
				test: /\.(png)$/,
				loader: 'url-loader?limit=100000',
			},],
	},
	plugins: [
		new webpack.DefinePlugin({
			SERVER_HOST: JSON.stringify(process.env.NODE_ENV === 'dev' ? 'http://localhost:9002' : '')
		}),
	],
};
