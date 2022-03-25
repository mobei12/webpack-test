const assert = require('assert')

describe('webpack.base.js test case', () => {
	const baseConfig = require('../../lib/webpack.base.js') // eslint-disable-line
	// 测试打包入口文件
	it('entry', () => {
		assert.equal(
			baseConfig.entry.index,
			'/Users/mobeigege/personProject/git/webpack-test/builder-webpack/test/smoke/template/src/index/index.js'
		)
	})
})
