// 单独配置在一个文件中webpack.dll.conf.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
	//context: path.resolve(__dirname, './src'),
	context: process.cwd(),
	entry: {
		// 想统一打包的类库
		//vendor: ['react']
		library: ['react', 'react-dom']
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.less', '.css'],
		modules: [__dirname, 'node_modules']
	},
	output: {
		filename: '[name]_[chunkhash].dll.js',
		path: path.join(__dirname, '../dllBuild/library'),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			// name 必须和 output.library 一致
			name: '[name]_hash',
			// 该属性需要与 DllReferencePlugin 中一致
			context: __dirname,
			path: path.join(__dirname, '../dllBuild/library/[name].json')
		})
	]
}
