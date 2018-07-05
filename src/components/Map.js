import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleApiComponent from '../utils/GoogleApiComponent'


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
            const center = new maps.LatLng(30.337663, 76.394095)
            const zoom = 15
            const mapConfig = Object.assign({}, {
                center,
                zoom,
            })
            const node = ReactDOM.findDOMNode(mapRef)
            this.map = new maps.Map(node, mapConfig)
        }
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

