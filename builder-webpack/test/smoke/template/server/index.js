if (typeof window === 'undefined') {
	// 服务器端hack处理
	global.window = {}
	global.self = {}
}
const express = require('express')
const { renderToString } = require('react-dom/server')
const fs = require('fs')
const path = require('path')

const data = require('../package.json')

/* 导入html页面作为模版 */
const template = fs.readFileSync(
	path.join(__dirname, '../dist/search.html'),
	'utf-8'
)
const SSR = require('../dist/search-server')
/* 根据字符串替换内容 */
const renderMarkup = str =>
	template
		.replace('<!-- app -->', str)
		.replace(
			'<!-- app-data -->',
			`<script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>`
		)

const server = port => {
	const app = express()
	app.use(express.static('dist'))
	app.get('/search', (req, res) => {
		const html = renderMarkup(renderToString(SSR))
		res.status(200).send(html)
	})
	app.listen(port, () => {
		console.info(`server is running at ${port}`)
	})
}
server(process.env.PORT || 3001)
