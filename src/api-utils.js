const BASE_URL = "http://18.191.226.151"
const TOKEN  = "593370798:AAFAxBJE5jeqIncli1bT9FgAdqcL1Qi7MmI"

export const fetchTraffic = () => fetch(`${BASE_URL}/traffic-data`)
		.then( res => res.json() )
		.catch(() => ({lanes: []}))
		.then( data => data.lanes )


export const fetchSOS = () => fetch(`${BASE_URL}/sos-report`)
		.then( res => res.json() )
		.then( data => data.sos )


export const fetchAccident = () => fetch(`${BASE_URL}/get-reports`)
		.then( res => res.json() )
		.then( data => data.accident )

export const fetchAccidentImage = (id) => fetch(`https://api.telegram.org/bot${TOKEN}/getFile?file_id=${id}`)
		.then(res => res.json())
		.then(data => {
			if(data.ok === false) {
				return ""
			}
			return `https://api.telegram.org/file/bot${TOKEN}/${data.result.file_path}`
		})