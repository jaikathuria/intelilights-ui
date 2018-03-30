import React from 'react'
import ReactDOM from 'react-dom'

// Import CSS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App'

ReactDOM.render(
	<div className="full-body bg-light">
		<App/>
	</div>, 
	document.getElementById('root'))

