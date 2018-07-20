import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import './App.css';

import LocationSearchInput from './components/LocationSearchInput';
import Location from './components/Location';
import History from './components/History';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locationList: [],
      lat: 37.579,
      lng: 126.977,
      info: 'select location',
      historyList: JSON.parse(localStorage.getItem('locationList'))
    };

    this.findLocationIndex = function getRemoveIndex(name, locationList) {
      return new Promise((resolve, reject) => {
        resolve(locationList.findIndex(location => {
          return location.name === name;
        }));
      });
    };

    this.historyId = 1;

    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
    this.moveLocation = this.moveLocation.bind(this);
    this.showLocationOnMap = this.showLocationOnMap.bind(this);
    this.showResult = this.showResult.bind(this);
    this.selectHistory = this.selectHistory.bind(this);
    this.storeLocation = this.storeLocation.bind(this);
  }

  addLocation(location) {
    this.setState({
      locationList: this.state.locationList.concat(location)
    });
  }

  removeLocation(e) {
    const id = parseInt(e.target.parentNode.getAttribute('id').split('location')[1]);
    const { locationList } = this.state;

    this.setState({
      locationList: locationList.filter(location => {
        return location.id !== id;
      })
    });
  }

  showLocationOnMap(e) {
    const parent = e.target.parentNode;
    const lat = parseFloat(parent.querySelector('.latitude strong').innerText);
    const lng = parseFloat(parent.querySelector('.longitude strong').innerText);
    const name = parent.querySelector('.location strong').innerText;
    this.setState({
      info: `${name}(${lat}, ${lng})`
    });
    console.log(lat, lng);
    this.moveLocation(lat, lng);
  }

  showResult() {
    let latSum = 0;
    let lngSum = 0;
    const count = this.state.locationList.length;

    this.state.locationList.forEach(location => {
      latSum += location.latLng.lat;
      lngSum += location.latLng.lng;
    });

    const latResult = latSum / count;
    const lngResult = lngSum / count;
    this.setState({
      info: `입력하신 위치들의 중간지점은 (${latResult}, ${lngResult})입니다.`
    });
    this.moveLocation(latResult, lngResult);
  }

  closeMap() {
    document.querySelector('div.modal').classList.remove('is-visible');
    document.querySelector('div.dim').classList.remove('is-visible');
  }

  moveLocation(lat, lng) {
    document.querySelector('div.modal').classList.add('is-visible');
    document.querySelector('div.dim').classList.add('is-visible');
    this.setState({
      lat: lat,
      lng: lng
    });
  }

  storeLocation(location) {
    const locationList = this.state.historyList.filter(history => {
      return history.name !== location.name;
    });

    if(locationList.length > 20) {
      locationList.remove(0);
    };

    locationList.push(location);
    localStorage.setItem('locationList', JSON.stringify(locationList));
    this.setState({
      historyList: locationList
    });
  }

  toggleHistory() {
    const historyList = document.querySelector('ul.history-list');
    const dim = document.querySelector('div.dim');

    if(historyList.classList.contains('is-visible')) {
      historyList.classList.remove('is-visible');
      dim.classList.remove('transparency');
      return;
    }
    historyList.classList.add('is-visible');
    dim.classList.add('transparency');
  }

  selectHistory(e) {
    const name = e.target.innerText;
    const result = JSON.parse(localStorage.getItem('locationList')).filter(location => {
      return location.name === name;
    })[0];

    this.storeLocation(result);
    result.id = `H-${this.historyId++}`;
    this.addLocation(result);
    this.toggleHistory();
  }

  render() {
    const locations = this.state.locationList.map((location, i) => {
      return (
        <li className="location" key={i} id={`location${location.id}`}>
          <div className="close-btn" onClick={this.removeLocation}> </div>
          <h5 className="location"><strong>{location.name}</strong></h5>
          <p className="latitude">Latitude(위도): <strong>{location.latLng.lat}</strong></p>
          <p className="longitude">Longitude(경도): <strong>{location.latLng.lng}</strong></p>
          <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.showLocationOnMap}>
            지도 보기
          </button>
        </li>
        // <Location id={i} key={i} location={location} removeLocation={this.removeLocation}/>
      )
    });

    const MapWithAMarker = withGoogleMap(props =>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
      >
        <Marker
          position={{ lat: this.state.lat, lng: this.state.lng }}
        />
      </GoogleMap>
    );

    return (
      <div className="App">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
              <a href="/"><span className="mdl-layout-title">Where_We_Meet</span></a>
              <div className="mdl-layout-spacer"></div>
              <History onClick={this.toggleHistory} historyList={this.state.historyList} selectHistory={this.selectHistory}/>
            </div>
          </header>
          <main className="mdl-layout__content">
            <div className="page-content" id="locationSearchZone">

              <LocationSearchInput addLocation={this.addLocation} storeLocation={this.storeLocation}/>
            </div>
            <div className="page-content" id="locationListZone">
              <ul className="location-list">
                {locations}
              </ul>
            </div>
            <div className="dim" onClick={this.toggleHistory}></div>
            <div className="modal">
              <h4>{this.state.info}</h4>
              <MapWithAMarker
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
              <button id="close-map"
                      className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect
                        mdl-button--accent"
                      onClick={this.closeMap}
              >
                Close
              </button>
            </div>
            <button
              id="get-result"
              className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              onClick={this.showResult}
            >
              <strong>Where We Meet Is...</strong>
            </button>
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
