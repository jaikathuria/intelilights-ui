export const fetchTraffic = () => fetch("http://localhost:5000/traffic-data")
		.then( res => res.json() )
		.then( data => data.lanes )