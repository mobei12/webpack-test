const merge = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const baseConfig = require('./webpack.base')

const prodConfig = {
	mode: 'production',
	/* cdn分离依赖包 */
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	},
	optimization: {
		splitChunks: {
			minSize: 10, // 当文件大小小于该值时，不会生成单独的chunk文件
			cacheGroups: {
				commons: {
					// 对使用的公共文件进行抽离
					name: 'commons',
					chunks: 'all',
					minChunks: 2 // 最小公共次数
				}
			}
		}
	},
	plugins: [
		/* css压缩 */
		new CssMinimizerPlugin({
			test: /\.css$/
		})
	]
}
module.exports = merge(baseConfig, prodConfig)
