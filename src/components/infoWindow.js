import { Component } from 'react'

export default class InfoWindow extends Component {

    componentDidMount() {
        this.infoWindow = new this.props.google.maps.InfoWindow()
        this.openWindow()
    }

    componentDidUpdate(prevProps){
        if (prevProps.marker !== this.props.marker) {
            this.closeWindow()
            this.openWindow()
        }
    }

    openWindow() {
        if (this.props.marker) {
            this.infoWindow.setContent(`
                <div role={'textbox '}>
                    <h3> ${this.props.marker.name} </h3>
                    <p> Rating: ${this.props.marker.rating}/10 </p>
                    ${this.props.marker.url ? `<a href="${this.props.marker.url}" target="_blank"> Read More </a>` : `No Info Available`}
                </div>
            `)
            this.infoWindow.open(this.props.map, this.props.marker)
        }
    }

    closeWindow() {
        this.infoWindow.close()
    }

    render(){
        return null
    }
}