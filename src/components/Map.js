import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleApiComponent from '../utils/GoogleApiComponent'
import { fetchSOS } from '../api-utils'

const MAP_CENTER = {
    lat: 30.516447,
    lng: 76.65949379999999,
}

class Map extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.google !== this.props.google) {
            this.loadMap()
        }
    }

    componentDidMount() {
        this.loadMap()
    }

    loadMap(){
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props
            const maps = google.maps
            const mapRef = this.refs.map
            console.log(mapRef)
            const center = new maps.LatLng(MAP_CENTER.lat,MAP_CENTER.lng)
            const zoom = 18
            const mapConfig = Object.assign({}, {
                center,
                zoom,
            })
            const node = ReactDOM.findDOMNode(mapRef)
           
            this.map= new maps.Map(node, mapConfig)

            this.SOS_LISTENER = setInterval(()=>{
                fetchSOS()
                    .then(sos => {
                        sos.map(sos => this.renderSOS(sos))
                    })
            },1000)
            google.maps.event.addListener(this.map, 'click', ()=>{
                //this.renderMarker()
            })
            google.maps.event.addListener(this.map, 'rightclick', ()=>{
               //this.renderSos()
            })
            
        }
    }

    renderAccident({lat,lng}){
        const position = new this.props.google.maps.LatLng(lat,lng)
        const pref = {
                map: this.map,
                position: position,
                name: "Accident",
                animation: this.props.google.maps.Animation.DROP
        };
        this.marker = new this.props.google.maps.Marker(pref)
    }

    renderSOS({lat,lng,msg}){
        const pinImage = new this.props.google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/009900/");
        const position = new this.props.google.maps.LatLng(lat,lng)
        const pref = {
                map: this.map,
                position: position,
                name: "SOS",
                icon: pinImage,
                msg: msg,
                animation: this.props.google.maps.Animation.DROP
        };
        this.marker = new this.props.google.maps.Marker(pref)
    }



    render() {
        const style = {
          width: '100vw',
          height: '100vh'
        }
        return (
            <div ref='map' className={'map'} style={style}>
                { this.props.error ? (<p className={"map-message"}>Failed to Load Google Maps</p>) : (<p className={"map-message"}>Loading Google Maps . . .</p>) }
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: 'AIzaSyCTPANDaNQMRYRGR8z9UPy8SQdokC30rbk'
})(Map)

