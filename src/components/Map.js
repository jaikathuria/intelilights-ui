import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleApiComponent from '../utils/GoogleApiComponent'
import { fetchSOS, fetchAccident, fetchAccidentImage } from '../api-utils'

const MAP_CENTER = {
    lat: 30.516447,
    lng: 76.65949379999999,
}

class Map extends Component {

    state = {
        accident: null,
        sos: []
    }

    componentDidUpdate(prevProps,prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap()
        }
        if(prevState.sos !== this.state.sos){
            this.state.sos.map(sos => this.renderSOS(sos))
        }
        if(prevState.accident !== this.state.accident){
            this.state.accident && this.renderAccident(this.state.accident)
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
            const zoom = 14
            const mapConfig = Object.assign({}, {
                center,
                zoom,
            })
            const node = ReactDOM.findDOMNode(mapRef)
           
            this.map= new maps.Map(node, mapConfig)

            this.LISTENER = setInterval(()=>{
                fetchSOS()
                    .then(soss => {
                        if (this.state.sos.length !== soss.length ){
                            soss.length !== 0 && this.setState({
                                sos: soss
                            })
                        }
                    })
                fetchAccident()
                    .then(accident => {
                        if (this.state.accident){
                            if (this.state.accident.id !== accident.id){
                                this.setState({
                                    accident
                                })
                      
                            } 
                         }
                         else {
                            if (accident){
                                this.setState({
                                    accident
                                })
                            }
                        }
                    })
            },1000)
        }
    }

    renderAccident({lat,lon, imageurl, userid}){
        const position = new this.props.google.maps.LatLng(lat,lon)
        const pref = {
                map: this.map,
                position: position,
                name: "Accident",
                animation: this.props.google.maps.Animation.DROP
        };
        const marker = new this.props.google.maps.Marker(pref)
        marker.infowindow = new this.props.google.maps.InfoWindow()
        fetchAccidentImage(imageurl)
            .then(url => {
                marker.infowindow.setContent(`
                    <div role={'textbox'}>
                        <h3> ${userid} </h3>
                        <img src="${url}" alt="${userid} accident image">
                    </div>
                `)
            })
        
        marker.addListener('click',()=>{
            marker.infowindow.open(this.map,marker)
        })
        
        
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
        const marker = new this.props.google.maps.Marker(pref)
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

