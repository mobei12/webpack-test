if (typeof window === 'undefined') {
	// 服务器端hack处理
	global.window = {}
	global.self = {}
}
const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')

process.chdir(path.join(__dirname, 'template'))
rimraf('./dist/', () => {
	const prodConfig = require('../../lib/webpack.prod')
	webpack(prodConfig, (err, stats) => {
		if (err) {
			console.log(err)
			process.exit(2)
		}
		console.log(
			stats.toString({
				colors: true,
				modules: false,
				children: false
			})
		)
	})
})
