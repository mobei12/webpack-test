import React from 'react'
import ReactDom from 'react-dom'
import common from '../../common/index'
import { shaking } from './tree-shaking'
import logo from '../image/logo.png'
import './search.less'

common()
shaking()

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
ReactDom.render(<Search />, document.querySelector('#root'))
