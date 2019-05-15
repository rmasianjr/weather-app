import React, { Component } from 'react';

class LocationInput extends Component {
  state = {
    address: '',
    geo: null
  };

  searchInput = React.createRef();

  componentDidMount() {
    /*global google*/
    /* the above code is required when using google variable*/

    this.autocomplete = new google.maps.places.Autocomplete(
      this.searchInput.current
    );
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handleOnChange = e => {
    const value = e.target.value;
    this.setState(() => ({
      address: value
    }));
  };

  handlePlaceSelect = () => {
    const place = this.autocomplete.getPlace();
    if (!place.geometry) {
      console.error(`No details available for input ${place.name}`);
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
  };

  render() {
    const { address } = this.state;
    return (
      <input
        type="search"
        q="locationsearch"
        ref={this.searchInput}
        placeholder="Enter a Location"
        onChange={this.handleOnChange}
        value={address}
      />
    );
  }
}

export default LocationInput;
