const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const path = require('path')

/* 动态获取入口和模版 */
const projectRoot = process.cwd()
const setMPA = (name = 'index') => {
	const entry = {}
	const htmlWebpackPlugins = []
	const entryFiles = glob.sync(path.join(projectRoot, `/src/*/${name}.js`))
	Object.keys(entryFiles).map(index => {
		const entryFile = entryFiles[index]
		const regexp = new RegExp(`src/(.*)/${name}.js`)
		const match = entryFile.match(regexp)
		const pageName = match && match[1]

		entry[pageName] = entryFile
		return htmlWebpackPlugins.push(
			new HtmlWebpackPlugin({
				inlineSource: '.css$',
				template: path.join(
					projectRoot,
					`./src/${pageName}/index.html`
				),
				filename: `${pageName}.html`,
				chunks: ['vendors', pageName],
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
	})

	return {
		entry,
		htmlWebpackPlugins
	}
}
const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
	entry,
	output: {
		filename: '[name].[chunkhash:8].js', // 打包后的文件名称
		path: path.resolve(projectRoot, './dist') // 打包后的目录
	},
	module: {
		rules: [
			{
				oneOf: [
					// 内联loader,和自适应,引入mate有关
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
							remUnit: 1080, // 设计稿等分的基数
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
		function errorPlugin() {
			// 打包错误提示
			this.hooks.done.tap('done', stats => {
				if (
					stats.compilation.errors &&
					stats.compilation.errors.length &&
					process.argv.indexOf('--watch') === -1
				) {
					console.log(stats.compilation.errors) //eslint-disable-line
					process.exit(2)
				}
			})
		}
	].concat(htmlWebpackPlugins),
	stats: 'errors-only'
}
