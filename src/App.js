import React, {Component} from 'react';
import './App.css';

import LocationSearchInput from './components/LocationSearchInput';
import Location from './components/Location';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locationList: []
    };

    this.findLocationIndex = function getRemoveIndex(name, locationList) {
      return new Promise((resolve, reject) => {
        resolve(locationList.findIndex(location => {
          return location.name === name;
        }));
      });
    };

    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  componentDidUpdate() {
    // console.log(this.state.locationList);
  }

  addLocation(location) {
    this.setState({
      locationList: this.state.locationList.concat(location)
    });
  }

  removeLocation(e) {
    const name = e.target.nextSibling.innerText;
    const { locationList } = this.state;
    this.setState({
      locationList: locationList.filter(location => {
        return location.name !== name;
      })
    });
  }

  render() {
    const locations = this.state.locationList.map((location, i) => {
      return (
        <li key={i}>
          <div className="close-btn" onClick={this.removeLocation}> </div>
          <h5 className="location"><strong>{location.name}</strong></h5>
          <p className="latitude">Latitude(위도): <strong>{location.latLng.lat}</strong></p>
          <p className="longitude">Longitude(경도): <strong>{location.latLng.lng}</strong></p>
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect">
            지도 보기
          </button>
        </li>
        // <Location id={i} key={i} location={location} removeLocation={this.removeLocation}/>
      )
    });

    return (
      <div className="App">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              <span className="mdl-layout-title">Where_We_Meet</span>
              <div className="mdl-layout-spacer"></div>
            </div>
          </header>
          <main className="mdl-layout__content">
            <div className="page-content" id="locationSearchZone">
              <LocationSearchInput addLocation={this.addLocation}/>
            </div>
            <div className="page-content" id="locationListZone">
              <ul className="location-list">
                {locations}
              </ul>
            </div>
          </main>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
