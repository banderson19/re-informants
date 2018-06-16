import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, {Component} from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import {mapMoveCoordinates} from '../../ducks/reducers/search'

class GoogleMaps extends Component {
  constructor(){
    super()
    this.state = {
      map: null,
      lng: null,
      lat: null
    }
  }
  mapMoved(){
    const position = (this.state.map.getCenter())
    const lat = position.lat();
    const lng = position.lng();
    
    this.props.mapMoveCoordinates({lat, lng})

    console.log('map Moved', lat)
    this.props.searchFunction({lat, lng})
    
  }
  mapLoaded(map){
    if (this.state.map !=null)
      return
    
    this.setState({
      map: map
    })

  }
  handleClick = (informant)=>{
    console.log("click", informant)
  }
  
    render (){
      const markers = this.props.markers.map((informant, i)=>{
        console.log(informant)
        const marker = {
          position: {
            lat: parseFloat(informant.lat),
            lng: parseFloat(informant.lng)
          }
        }
        return <Marker onClick={()=>this.handleClick(informant)} key={i}{...marker}/>
      })
      // console.log("props", this.props)
        return(
        <div>
            <div>
              <GoogleMap 
                ref={this.mapLoaded.bind(this)}
                onDragEnd = {()=>this.mapMoved()}
                defaultZoom={14}
                center={{lat: this.props.search.mapMoveLat||this.props.center.lat||this.props.defaultCenter.lat, lng: this.props.search.mapMoveLng||this.props.center.lng||this.props.defaultCenter.lng}}
                defaultCenter={{ lat: 41.00472, lng: -111.9051596 }}>
                {this.props.search.searchLat!==null && <Marker position={{lat:this.props.search.searchLat, lng: this.props.search.searchLng}}/>}              
                {markers}
              </GoogleMap>  
            </div>       
          </div>
        )
    }
}

function mapStateToProps(state){
  const {search, form} = state
  return {search, form}
}
export default connect(mapStateToProps,{mapMoveCoordinates})(withGoogleMap(GoogleMaps))


// export default withGoogleMap(GoogleMaps)