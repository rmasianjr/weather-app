import React, { Component } from 'react';
import './LocationInput.css';

const initialState = { address: '', geo: null, error: null };

class LocationInput extends Component {
  state = { ...initialState };

  searchInput = React.createRef();

  componentDidMount() {
    /*global google*/
    /* the above code is required when using google variable*/

    this.autocomplete = new google.maps.places.Autocomplete(
      this.searchInput.current
    );
    this.autocomplete.setFields(['formatted_address', 'geometry']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handleOnChange = e => {
    const value = e.target.value;
    this.setState(() => ({
      address: value,
      error: null
    }));
  };

  handlePlaceSelect = () => {
    const place = this.autocomplete.getPlace();

    if (!place.geometry) {
      const error = new Error(`No details available for input "${place.name}"`);
      this.setState(() => ({ error }));
      return;
    }

    const geo = {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng()
    };

    this.setState(() => ({
      address: place.formatted_address,
      geo
    }));

    this.submitQuery();
  };

  submitQuery() {
    const { geo, address } = this.state;
    this.props.getLocationWeather(geo.lat, geo.lon, address);
    this.setState(() => ({ ...initialState }));
  }

  render() {
    const { address, error } = this.state;
    return (
      <div className="search-container">
        <div className="search-icon"></div>
        <input
          className="search-input"
          type="search"
          q="locationsearch"
          ref={this.searchInput}
          placeholder="Enter a Location"
          onChange={this.handleOnChange}
          value={address}
        />
        {error && <span>{error.message}</span>}
      </div>
    );
  }
}

export default LocationInput;
