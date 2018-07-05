export const fetchTraffic = () => fetch("http://18.191.226.151//traffic-data")
		.then( res => res.json() )
		.then( data => data.lanes )