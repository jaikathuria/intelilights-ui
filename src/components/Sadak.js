import React, { Component } from 'react'

export default class Sadak extends Component {
	state = {
		color: this.props.lane.running === true ? "green" : "red",
		timer: this.props.lane.timer || 0
	}

	tick(){
		const timer = this.state.timer - 1
		
		if (timer === 0) {
			

			if(this.state.color === "green"){
				this.setState({
					color: "yellow",
					timer: 5
				})
			}

			else if (this.state.color === "yellow"){
				this.setState({
					color: "red",
					timer: 0
				})
			}
			
			else {
				//fetch new data
				this.props.newData()
			}


			
		}

		else if (timer > 0){

			this.setState({
				timer
			})

		}


		
	}

	stopTimer() {
		clearInterval(this.timer)
	}

	componentDidMount(){
		if(this.state.timer){
			this.timer = setInterval(this.tick.bind(this),1000)
		}
	}

    componentWillUnmount(){
		this.stopTimer()
	}

	componentWillReceiceProps(newProps){
		if(this.props.lane.running !== newProps.lane.running){
			if(newProps.lane.running === true){
                this.setState({
                    color: "green"
                })
			}
			else {
				this.setState({
					color: "red"
				})
			}

		}
	}

	render(){
		const {name, count} = this.props.lane
		const {timer} = this.state
		return (
		<div className={`row thin list-item ${this.state.color}`}>
			<div className="col-6">{name}</div>
			<div className="col-3">{count}</div>
			<div className="col-3">{timer}</div>
		</div>
		)
	}
}