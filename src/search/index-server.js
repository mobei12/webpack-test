const React = require('react')
const logo = require('../image/logo.png')
require('./search.less')

class Search extends React.Component {
	constructor() {
		super()
		this.state = {
			Text: null
		}
	}

	/* 动态组件导入 */
	loadComponent() {
		import('./testImport').then(Text => {
			this.setState({ Text: Text.default })
		})
	}

	render() {
		// debugger
		const { Text } = this.state
		return (
			<div>
				{Text ? <Text /> : <div>加载中...</div>}
				<h1 className='title'>这是搜索页面</h1>
				<img
					className='img'
					src={logo}
					onClick={this.loadComponent.bind(this)}
					alt='124'
				/>
			</div>
		)
	}
}
module.exports = <Search />
