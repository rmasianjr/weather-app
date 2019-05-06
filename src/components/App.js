import React, { Component } from 'react';

import Weather from './Weather/Weather';
import ConvertControl from './ConvertControl/ConvertControl';
import { toFahrenheit, toCelsius } from '../helper/converter.js';
import { getLocation } from '../helper/getLocation';

class App extends Component {
  state = {
    weatherData: null,
    temperature: null,
    unit: null
  };

  componentDidMount() {
    this.checkGeolocation();
  }

  checkGeolocation() {
    if ('geolocation' in navigator) {
      getLocation()
        .then(coords =>
          this.getLocationWeather(coords.latitude, coords.longitude)
        )
        .catch(error => {
          console.log(error);
          this.getLocationByIP();
        });
    } else {
      console.log('Geolocation is not supported by this browser');
      this.getLocationByIP();
    }
  }

  getLocationByIP() {
    const endpoint = 'https://ipapi.co/json/';
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const { latitude, longitude } = data;
        this.getLocationWeather(latitude, longitude);
      })
      .catch(error => console.log(error));
  }

  getLocationWeather(latitude, longitude) {
    const endpoint = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const { main, name, sys, weather } = data;
        const weatherData = {
          status: weather[0].main,
          description: weather[0].description,
          place: `${name}, ${sys.country}`
        };

        this.setState(() => ({
          weatherData,
          temperature: main.temp.toFixed(1),
          unit: 'celcius'
        }));
      })
      .catch(err => console.log(err.message));
  }

  convertTo = e => {
    if (!e.target.checked) {
      this.setState(prevState => ({
        temperature: toCelsius(prevState.temperature),
        unit: 'celcius'
      }));
    } else {
      this.setState(prevState => ({
        temperature: toFahrenheit(prevState.temperature),
        unit: 'fahrenheit'
      }));
    }
  };

  render() {
    const { weatherData, temperature, unit } = this.state;

    return (
      <div className="container">
        <div className="app">
          <h1>Weather App</h1>
          {weatherData && temperature ? (
            <div className="app-content">
              <Weather
                weatherData={weatherData}
                temperature={temperature}
                unit={unit}
              />
              <ConvertControl convertTo={this.convertTo} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
