const glob = require('glob-all')
// 描述要测试的
describe('检查js文件,css文件', () => {
	// 一个测试用例
	it('should generate css files', done => {
		const files = glob.sync(['./dist/*.css', './dist/*.js'])
		if (files.length > 0) {
			done()
		} else {
			throw new Error('js、css文件生成失败')
		}
		// expect,断言
	})
})
