const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const settings = {
	mode: 'development',
	entry: {
		main: './src/js/app.js',
	},

	output: {
		filename: 'js/[name]-[contenthash:6].js',
		path: path.join(__dirname, '../build'),
		assetModuleFilename: 'images/[hash][ext][query]',
	},

	devServer: {
		hot: false,
	  },
	


	module: {
		rules: [
		

			{
				test: /\.(css|sass|scss)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'New project',
			template: './src/template/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name]-[contenthash:2].css',
		}),
	],
}

module.exports = settings
