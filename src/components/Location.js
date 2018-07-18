import React, { Component } from 'react';
import './Location.css';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  render() {
    return (
      <li key={this.state.key}>
        <div className="close-btn" onClick={this.state.removeLocation}> </div>
        <h5 className="location"><strong>{this.state.location.name}</strong></h5>
        <p className="latitude">Latitude(위도): <strong>{this.state.location.latLng.lat}</strong></p>
        <p className="longitude">Longitude(경도): <strong>{this.state.location.latLng.lng}</strong></p>
        <button className="mdl-button mdl-js-button mdl-js-ripple-effect">
          지도 보기
        </button>
      </li>
    )
  }
}

export default Location;