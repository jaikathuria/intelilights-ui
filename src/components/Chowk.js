import React, { Component } from 'react'
import Sadak from './Sadak'
import { fetchTraffic } from '../api-utils'

export default class Chowk extends Component {
	state = {
		lanes: []
	}

	componentDidMount(){
		this.getData()
	}

	getData(){
		fetchTraffic()
		.then( lanes => this.setState({
			lanes
		}))
	}

	render() { 
		return (
		<div>
			<div className="dummy"></div>
			<div className="container batch-group chowk">
			      <div is="batch-element" data-batch="2015-19" className="row margin-top-50">
			          <div className="col-12 group no-padding">
			              <div className="batch col-12 list-item text-center capital"><span className="batch-heading">Tribune</span><span className="batch-value bold">Chowk</span></div>
			              <div className="col-sm-12 col-xs-10 col-xs-offset-1 grey text-left">
			                  <div className="row bold list-item ">
			                      <div className="col-6">Exit</div>
			                      <div className="col-3">Car Count</div>
			                      <div className="col-3">Timer</div>
			                  </div>
			                  
			                  {
			                  	this.state.lanes.map((lane) =>
			                  		 <Sadak lane={lane} key={lane.id} newData={this.getData.bind(this) }/>)
		              		  }
			              </div>
			          </div>
			      </div>
			  </div>
		</div>
		)
	}
}