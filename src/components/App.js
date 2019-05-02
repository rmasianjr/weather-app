import React, { Component } from 'react';

import Weather from './Weather';
import ConvertControl from './ConvertControl';
import { toFahrenheit, toCelsius } from '../helper/converter.js';

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

  convertTo = unit => {
    if (unit === 'celcius') {
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
      <div>
        <h1>Weather App</h1>
        {weatherData && temperature ? (
          <div>
            <Weather
              weatherData={weatherData}
              temperature={temperature}
              unit={unit}
            />
            <ConvertControl convertTo={this.convertTo} unit={unit} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
