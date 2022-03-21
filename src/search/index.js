'use strict'
import React from 'react'
import ReactDom from 'react-dom'
import { common } from '../../common/index.js'
import logo from '../image/logo.png'
common()
import './search.less'
class Search extends React.Component {
	render() {
		//debugger
		return (
			<div>
				<h1 className='title'>这是搜索页面</h1>
				<img className='img' src={logo} alt='124' />
			</div>
		)
	}
}
ReactDom.render(<Search />, document.querySelector('#root'))
