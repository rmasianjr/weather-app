import React, { Component } from 'react';

import Weather from './Weather/Weather';
import ConvertControl from './ConvertControl/ConvertControl';
import Loading from './Loading/Loading';
import Modal from './Modal/Modal';
import { toFahrenheit, toCelsius } from '../helper/converter.js';
import { getLocation } from '../helper/getLocation';

class App extends Component {
  state = {
    weatherData: null,
    temperature: null,
    unit: null,
    error: {},
    isOpen: false,
    isFetching: true
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
          this.setState(prevState => ({
            error,
            isOpen: !prevState.isOpen
          }));
        });
    } else {
      console.log('Geolocation is not supported by this browser');
      const error = new Error('Geolocation is not supported by this browser');
      this.setState(prevState => ({
        error,
        isOpen: !prevState.isOpen
      }));
    }
  }

  getLocationByIP = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));

    const endpoint = 'https://ipapi.co/json/';
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const { latitude, longitude } = data;
        this.getLocationWeather(latitude, longitude);
      })
      .catch(error => console.log(error));
  };

  getLocationWeather(latitude, longitude) {
    const endpoint = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const weatherData = {
          status: weather[0].main,
          description: weather[0].description,
          place: `${name}, ${sys.country}`
        };

        this.setState(prevState => ({
          weatherData,
          temperature: main.temp.toFixed(1),
          unit: 'celcius',
          isFetching: !prevState.isFetching
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
    const {
      weatherData,
      temperature,
      unit,
      isOpen,
      error,
      isFetching
    } = this.state;

    return (
      <div className="container">
        <div className="app">
          <h1>Weather App</h1>
          {isFetching && isOpen ? (
            <Modal
              warning={error}
              isOpen={isOpen}
              runFallback={this.getLocationByIP}
            />
          ) : isFetching ? (
            <Loading />
          ) : (
            <div className="app-content">
              <Weather
                weatherData={weatherData}
                temperature={temperature}
                unit={unit}
              />
              <ConvertControl convertTo={this.convertTo} />
              {isOpen && (
                <Modal warning={error} runFallback={this.getLocationByIP} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
