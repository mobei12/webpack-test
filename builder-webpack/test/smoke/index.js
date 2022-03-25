if (typeof window === 'undefined') {
	// 服务器端hack处理
	global.window = {}
	global.self = {}
}
const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({ timeout: 10000 })

process.chdir(path.join(__dirname, 'template'))
rimraf('./dist/', () => {
	const prodConfig = require('../../lib/webpack.prod') // eslint-disable-line
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
		console.info('开始测试')
		mocha.addFile(path.join(__dirname, 'html-test.js'))
		mocha.addFile(path.join(__dirname, 'css-js-test.js'))
		mocha.run(failures => {
			process.on('exit', () => {
				process.exit(failures)
			})
		})
	})
})
