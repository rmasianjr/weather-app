import React, { Component } from 'react';
import axios from 'axios';

import Weather from './Weather/Weather';
import ConvertControl from './ConvertControl/ConvertControl';
import Loading from './Loading/Loading';
import Modal from './Modal/Modal';
import Footer from './Footer/Footer';
import LocationInput from './LocationInput/LocationInput';
import { toFahrenheit, toCelsius } from '../helper/converter.js';
import { getLocation } from '../helper/getLocation';
import { checkTempMeasurement } from '../helper/checkTempMeasurement';

class App extends Component {
  state = {
    weatherData: null,
    temperature: null,
    unit: null,
    error: null,
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
          const type = error.code === 1 ? 'warn' : 'fetch';
          this.setState(prevState => ({
            error: {
              errorContent: error,
              type
            },
            isOpen: !prevState.isOpen
          }));
        });
    } else {
      const error = new Error('Geolocation is not supported by this browser');
      this.setState(prevState => ({
        error: {
          errorContent: error,
          type: 'warn'
        },
        isOpen: !prevState.isOpen
      }));
    }
  };

  getLocationByIP = () => {
    const endpoint = 'https://ipapi.co/json/';
    axios
      .get(endpoint)
      .then(res => {
        const { latitude, longitude } = res.data;
        this.getLocationWeather(latitude, longitude);
      })
      .catch(error => {
        this.setState(prevState => ({
          error: {
            errorContent: error,
            type: 'fetch'
          },
          isOpen: !prevState.isOpen
        }));
      });
  };

  getLocationWeather = (latitude, longitude, location) => {
    const weatherEndpoint = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
    const timeEndpoint = `https://api.timezonedb.com/v2.1/get-time-zone?key=${
      process.env.REACT_APP_TIMEZONEDB_KEY
    }&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    const weatherPromise = axios.get(weatherEndpoint).then(res => res.data);
    const timePromise = axios.get(timeEndpoint).then(res => res.data);

    this.setState(() => ({
      isFetching: true
    }));

    Promise.all([weatherPromise, timePromise])
      .then(values => this.setData(values, location))
      .catch(error => {
        this.setState(prevState => ({
          error: {
            errorContent: error,
            type: 'fetch'
          },
          isOpen: !prevState.isOpen
        }));
      });
  };

  setData(data, location) {
    const [weatherRes, timeRes] = data;
    const { main, name, sys, weather } = weatherRes;
    const { formatted, countryName } = timeRes;

    let unit, temperature;
    const usesFahrenheit = checkTempMeasurement(countryName);
    if (usesFahrenheit) {
      unit = 'fahrenheit';
      temperature = toFahrenheit(main.temp.toFixed(1));
    } else {
      unit = 'celcius';
      temperature = main.temp.toFixed(1);
    }

    const weatherData = {
      status: weather[0].main,
      description: weather[0].description,
      place: location ? location : `${name}, ${sys.country}`,
      timeInHour: parseInt(formatted.split(' ')[1].split(':')[0]) // get hour
    };

    this.setState(prevState => ({
      weatherData,
      temperature,
      unit,
      isFetching: !prevState.isFetching
    }));
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

  runTryAgain = () => {
    this.setState(prevState => ({
      error: null,
      isOpen: !prevState.isOpen
    }));

    this.checkGeolocation();
  };

  runFallBack = () => {
    this.setState(prevState => ({
      error: null,
      isOpen: !prevState.isOpen
    }));

    this.getLocationByIP();
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
          <div className="app-content">
            <LocationInput getLocationWeather={this.getLocationWeather} />
            {error ? (
              <Modal
                error={error}
                isOpen={isOpen}
                runFallback={this.runFallBack}
                runTryAgain={this.runTryAgain}
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
                <ConvertControl convertTo={this.convertTo} unit={unit} />
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
