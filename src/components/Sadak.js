import React, { Component } from 'react'

export default class Sadak extends Component {
	render(){
		console.log(this.props)

		return (
		<div className="row thin list-item red">
			<div className="col-6">{name}</div>
			<div className="col-3">{count}</div>
			<div className="col-3">{timer}</div>
		</div>
		)
	}
}