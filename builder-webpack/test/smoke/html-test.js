const glob = require('glob-all')

describe('检查html文件', () => {
	it('should generate html files', done => {
		const files = glob.sync(['./dist/*.html'])
		if (files.length > 0) {
			done()
		} else {
			throw new Error('html文件生成失败')
		}
	})
})
