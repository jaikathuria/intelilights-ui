import React, { Component } from 'react'
import Sadak from './Sadak'
import { fetchTraffic } from '../api-utils'

/* Dashboard Imports */

import Store from '@material-ui/icons/Store'
import DateRange from '@material-ui/icons/DateRange'
import WbSunny from '@material-ui/icons/WbSunny'
import Accessibility from '@material-ui/icons/Accessibility'
import Update from '@material-ui/icons/Update'
import BugReport from '@material-ui/icons/BugReport'
import Code from '@material-ui/icons/Code'
import Cloud from '@material-ui/icons/Cloud'


import GridContainer from 'material-dashboard-react/components/Grid/GridContainer'
import GridItem from 'material-dashboard-react/components/Grid/GridItem'
import Card from 'material-dashboard-react/components/Card/Card'
import CardHeader from 'material-dashboard-react/components/Card/CardHeader'
import CardIcon from 'material-dashboard-react/components/Card/CardIcon'
import CardFooter from 'material-dashboard-react/components/Card/CardFooter'
import CustomTabs from 'material-dashboard-react/components/CustomTabs/CustomTabs'
import Tasks from 'material-dashboard-react/components/Tasks/Tasks'

var bugs = [
	'Sign contract for "What are conference organizers afraid of?"',
	'Lines From Great Russian Literature? Or E-mails From My Boss?',
  ];


export default class Chowk extends Component {

	state = {
		lanes: []
	}
	componentDidMount(){
		fetchTraffic()
			.then(lanes => this.haveAllRed(lanes))
		
	}
	getData(){
		fetchTraffic()
		.then( lanes => this.setState({
			lanes
		}))
	}
	haveAllRed(lanes){
		if(lanes.filter(lane => lane.running).lenth === 0){
			fetchTraffic()
			.then(lanes => this.haveAllRed(lanes))
		}
		else {
			this.getData()
		}
	}
	render() { 
		return (
		<div>
			<div className="dummy"></div>
			<div className="container batch-group chowk">
				<GridContainer>
					<div className="margin-left">
					<GridItem xs={12} sm={6} md={3} className={'material-card'}>
						<Card>
						<CardHeader color="success" stats icon>
							<CardIcon color="success">
								<WbSunny />
							</CardIcon>
							<p className={'card-header'}>Active Lights</p>
							<h3 className={'card-content'}>4</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={''}>
							<DateRange />
							Last 24 Hours
							</div>
						</CardFooter>
						</Card>
					</GridItem>
					
					<GridItem xs={12} sm={6} md={3}>
						<Card>
						<CardHeader color="info" stats icon>
							<CardIcon color="info">
							<Accessibility />
							</CardIcon>
							<p className={'card-header'}>Online Officers</p>
							<h3 className={'card-content'}>+1</h3>
						</CardHeader>
						<CardFooter stats>
							<div className={''}>
							<Update />
							Just Updated
							</div>
						</CardFooter>
						</Card>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<CustomTabs
						title="Tasks:"
						headerColor="primary"
						tabs={[
							{
							tabName: "Bugs",
							tabIcon: BugReport,
							tabContent: (
								<Tasks
								checkedIndexes={[0, 3]}
								tasksIndexes={[0, 1]}
								tasks={bugs}
								/>
							)
							},
						]}
						/>
					</GridItem>
					</div>
				</GridContainer>
				
			    <div className=" margin-top-50">
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