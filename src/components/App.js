import React, { Component } from 'react';

import Weather from './Weather';

class App extends Component {
  state = {
    weatherData: null
  };

  componentDidMount() {
    this.checkGeolocation();
  }

  checkGeolocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.getLocationWeather(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    } else {
      console.log('geolocation is not supported');
    }
  }

  getLocationWeather(latitude, longitude) {
    const endpoint = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const weatherData = {
          icon: weather[0].icon,
          description: weather[0].description,
          place: `${name}, ${sys.country}`,
          temperature: main.temp
        };

        console.log(weatherData);

        this.setState(() => ({
          weatherData
        }));
      })
      .catch(err => console.log(err.message));
  }

  render() {
    const { weatherData } = this.state;

    return (
      <div>
        <h1>Weather App</h1>
        {weatherData ? (
          <Weather weatherData={weatherData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
