import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'


// Import CSS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App'

ReactDOM.render(
	<BrowserRouter>
		<div className="full-body bg-light">
			<App/>
		</div>
	</BrowserRouter>,
	document.getElementById('root'))

