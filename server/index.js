if (typeof window === 'undefined') {
	// 服务器端hack处理
	global.window = {}
	global.self = {}
}
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')

const renderMarkup = str => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test1</title>
</head>
<body>
    <div id="root">${str}</div>
</body>
</html>`
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
