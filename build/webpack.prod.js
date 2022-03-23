// webpack.config.js
'use strict'
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const {
	setMPA,
	eslintPlugin,
	friendlyErrorsWebpackPlugin,
	BuildCompiler
} = require('./commonTools')

const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
	mode: 'production', // 发包模式模式production: 生产模式，development: 开发模式
	entry, // 入口文件
	stats: 'errors-only', // 打包结果只在发生错误或有新的编译时输出
	output: {
		filename: '[name].[chunkhash:8].js', // 打包后的文件名称
		path: path.resolve(__dirname, '../dist') // 打包后的目录
	},
	/* cdn分离依赖包 */
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	},
	optimization: {
		splitChunks: {
			minSize: 10, // 当文件大小小于该值时，不会生成单独的chunk文件
			cacheGroups: {
				/* common: {
					//本地文件分离
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'vendors', //分离出来的文件名
					chunks: 'all' //拆分模式
				}, */
				commons: {
					//对使用的公共文件进行抽离
					name: 'commons',
					chunks: 'all',
					minChunks: 2 //最小公共次数
				}
			}
		}
	},
	module: {
		rules: [
			{
				oneOf: [
					//内联loader
					{
						resourceQuery: /raw/,
						type: 'asset/source'
					},
					{
						test: /\.js\?raw$/,
						use: ['asset/source', 'babel-loader']
					}
				]
			},
			{
				test: /.js$/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'px2rem-loader',
						options: {
							remUnit: 75, //750设计稿等分的基数
							remPrecision: 8 //保留8位小数
						}
					},
					'less-loader', //less 解析
					{
						loader: 'postcss-loader', //补全css前缀
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env']
							}
						}
					}
				]
			},
			/* {
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',//把资源压缩成base64
						options: {
							//压缩法
							limit: 10240
							//name: '[name].[hash:8].[ext]'
						}
					}
				]
			}, */
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							// 文件指纹
							name: '[name].[hash:8].[ext]'
						}
					}
				],
				type: 'javascript/auto'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: 'asset/resource'
				/* use: [
					{
						loader: 'file-loader',
						options: {
							// 文件指纹
							name: '[name].[hash:8].[ext]'
						}
					}
				] */
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		/* css 文件合并  */
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css'
		}),
		/* css压缩 */
		new CssMinimizerPlugin({
			test: /\.css$/
		})
	].concat(
		htmlWebpackPlugins,
		eslintPlugin,
		friendlyErrorsWebpackPlugin,
		new BuildCompiler()
	)
}
