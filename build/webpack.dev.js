// webpack.config.js
'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const { setMPA, eslintPlugin } = require('./commonTools')
const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
	mode: 'development', // 开发模式
	/* entry: {
		app: path.resolve(__dirname, './src/index/index.js'),
		search: path.resolve(__dirname, './src/search/search.js')
	}, // 入口文件 */
	entry,
	// 省略其他配置
	output: {
		filename: '[name].[chunkhash:8].js', // 打包后的文件名称
		path: path.resolve(__dirname, '../dist') // 打包后的目录
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							//压缩法
							limit: 10240
						}
					}
				]
			},
			/* {
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader'
					}
				] //
			}, */
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index/index.html')
		}),
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin()
	].concat(eslintPlugin),
	devServer: {
		//服务器访问的基本目录
		static: path.resolve(__dirname, 'dist'),
		compress: true,
		//端口
		port: 8080,
		//自动打开页面
		open: true
	},
	devtool: 'cheap-module-source-map' // 开发环境下的sourcemap, 可以在浏览器查看,cheap-module-source-map 只会生成一个map文件, 不会生成一个sourcemap文件
}
