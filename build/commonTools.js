const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
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
const eslintPlugin = new ESLintPlugin({
	fix: true,
	extensions: ['js', 'json', 'coffee'],
	exclude: '/node_modules/',
	overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js')
})
/* webpack构建日志 */
const friendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin()

/* 捕获构建错误 */
class BuildCompiler {
	apply(compiler) {
		compiler.hooks.compilation.tap('done', stats => {
			//console.log(stats)
		})
	}
}
module.exports = {
	setMPA,
	eslintPlugin,
	friendlyErrorsWebpackPlugin,
	BuildCompiler
}
