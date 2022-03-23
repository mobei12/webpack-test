const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const path = require('path')
/* 捕获构建错误 */
class BuildCompiler {
	apply(compiler) {
		compiler.hooks.compilation.tap('done', stats => {
			console.log(stats)
		})
	}
}
/* 动态获取入口和模版 */
const setMPA = (name = 'index') => {
	const entry = {}
	const htmlWebpackPlugins = []
	const entryFiles = glob.sync(path.join(__dirname, `../src/*/${name}.js`))
	Object.keys(entryFiles).map(index => {
		const entryFile = entryFiles[index]
		const regexp = new RegExp(`src/(.*)/${name}.js`)
		const match = entryFile.match(regexp)
		const pageName = match && match[1]
		if (pageName) {
			entry[pageName] = entryFile
			htmlWebpackPlugins.push(
				new HtmlWebpackPlugin({
					template: path.join(
						__dirname,
						`../src/${pageName}/index.html`
					),
					filename: `${pageName}.html`,
					chunks: [pageName],
					inject: true,
					minify: {
						html5: true,
						collapseWhitespace: true,
						preserveLineBreaks: false,
						minifyCSS: true,
						minifyJS: true,
						removeComments: false
					}
				})
			)
		}
	})
	return {
		entry,
		htmlWebpackPlugins
	}
}
const { entry, htmlWebpackPlugins } = setMPA
module.exports = {
	entry,
	module: {
		rules: [
			{
				test: /.js$/,
				use: 'babel-loader'
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
							remUnit: 75, // 750设计稿等分的基数
							remPrecision: 8 // 保留8位小数
						}
					},
					'less-loader', // less 解析
					{
						loader: 'postcss-loader', // 补全css前缀
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env']
							}
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		/* css 文件合并  */
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css'
		}),
		new CleanWebpackPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		function () {
			this.hooks.done.tap('done', stats => {
				if (
					stats.compilation.errors &&
					stats.compilation.errors.length
				) {
					console.log('build error')
					process.exit(1)
				}
			})
		}
	].concat(htmlWebpackPlugins),
	stats: 'errors-only'
}
