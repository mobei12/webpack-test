const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/* 动态获取入口和模版 */
const setMPA = () => {
	const entry = {}
	const htmlWebpackPlugins = []
	const entryFiles = glob.sync(path.join(__dirname, '../src/*/index.js'))
	Object.keys(entryFiles).map(index => {
		const entryFile = entryFiles[index]
		const match = entryFile.match(/src\/(.*)\/index\.js/)
		const pageName = match && match[1]
		entry[pageName] = entryFile
		htmlWebpackPlugins.push(
			new HtmlWebpackPlugin({
				template: path.join(__dirname, `../src/${pageName}/index.html`),
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
	})
	return {
		entry,
		htmlWebpackPlugins
	}
}
module.exports = {
	setMPA
}
