const BASE_URL = "http://18.191.226.151"

export const fetchTraffic = () => fetch(`${BASE_URL}/traffic-data`)
		.then( res => res.json() )
		.then( data => data.lanes )


export const fetchSOS = () => fetch(`${BASE_URL}/sos-report`)
		.then( res => res.json() )
		.then( data => data.sos )