import React, { Component } from 'react';

import Weather from './Weather/Weather';
import ConvertControl from './ConvertControl/ConvertControl';
import Loading from './Loading/Loading';
import Modal from './Modal/Modal';
import Footer from './Footer/Footer';
import LocationInput from './LocationInput/LocationInput';
import { toFahrenheit, toCelsius } from '../helper/converter.js';
import { getLocation } from '../helper/getLocation';

class App extends Component {
  state = {
    weatherData: null,
    temperature: null,
    unit: null,
    error: {},
    errorType: null,
    isOpen: false,
    isFetching: true
  };

  componentDidMount() {
    this.checkGeolocation();
  }

  checkGeolocation = () => {
    if ('geolocation' in navigator) {
      getLocation()
        .then(coords =>
          this.getLocationWeather(coords.latitude, coords.longitude)
        )
        .catch(error => {
          this.setState(prevState => ({
            errorType: 'warn',
            error,
            isOpen: !prevState.isOpen
          }));
        });
    } else {
      const error = new Error('Geolocation is not supported by this browser');
      this.setState(prevState => ({
        errorType: 'warn',
        error,
        isOpen: !prevState.isOpen
      }));
    }
  };

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
      .catch(error => {
        this.setState(prevState => ({
          error,
          errorType: 'fetch-ip',
          isOpen: !prevState.isOpen
        }));
      });
  };

  getLocationWeather = (latitude, longitude, location) => {
    const endpoint = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
    const { errorType } = this.state;

    if (errorType === 'fetch-geo') {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen,
        errorType: null
      }));
    }

    this.setState(() => ({
      isFetching: true
    }));

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const place = location ? location : `${name}, ${sys.country}`;

        const weatherData = {
          status: weather[0].main,
          description: weather[0].description,
          place
        };

        this.setState(prevState => ({
          weatherData,
          temperature: main.temp.toFixed(1),
          unit: 'celcius',
          isFetching: !prevState.isFetching
        }));
      })
      .catch(error => {
        this.setState(prevState => ({
          error,
          errorType: 'fetch-geo',
          isOpen: !prevState.isOpen
        }));
      });
  };

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
      errorType,
      isFetching
    } = this.state;

    return (
      <div className="container">
        <div className="app">
          <h1>Weather App</h1>
          <div className="app-content">
            <LocationInput getLocationWeather={this.getLocationWeather} />
            {isFetching && isOpen ? (
              <Modal
                warning={error}
                isOpen={isOpen}
                runFallback={this.getLocationByIP}
                errorType={errorType}
                runTryAgain={this.checkGeolocation}
              />
            ) : isFetching ? (
              <Loading />
            ) : (
              <div>
                <Weather
                  weatherData={weatherData}
                  temperature={temperature}
                  unit={unit}
                />
                <ConvertControl convertTo={this.convertTo} />
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
