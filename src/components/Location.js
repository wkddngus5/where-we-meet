import React, { Component } from 'react';
import './Location.css';

class Location extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id, removeLocation, location, showLocationOnMap} = this.props;

    return (
      <li className="location" id={id}>
        <div className="close-btn" onClick={removeLocation}> </div>
        <h5 className="location"><strong>{location.name}</strong></h5>
        <p className="latitude">Latitude(위도): <strong>{location.latLng.lat}</strong></p>
        <p className="longitude">Longitude(경도): <strong>{location.latLng.lng}</strong></p>
        <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={showLocationOnMap}>
          지도 보기
        </button>
      </li>
    )
  }
}

export default Location;