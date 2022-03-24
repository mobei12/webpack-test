const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devConfig = {
	mode: 'development',
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		// 服务器访问的基本目录
		static: './dist',
		compress: true,
		// 端口
		port: 8080,
		// 自动打开页面
		open: true
	},
	devtool: 'cheap-module-source-map'
}

module.exports = merge(baseConfig, devConfig)
