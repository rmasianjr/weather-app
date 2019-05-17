import React, { Component } from 'react';

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
    const weatherEndpoint = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
    const timeEndpoint = `https://api.timezonedb.com/v2.1/get-time-zone?key=${
      process.env.REACT_APP_TIMEZONEDB_KEY
    }&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    this.setState(() => ({
      isFetching: true
    }));

    const weatherPromise = fetch(weatherEndpoint).then(res => res.json());
    const timePromise = fetch(timeEndpoint).then(res => res.json());

    Promise.all([weatherPromise, timePromise])
      .then(values => this.setData(values, location))
      .catch(error => {
        this.setState(prevState => ({
          error,
          errorType: 'fetch-geo',
          isOpen: !prevState.isOpen
        }));
      });

    const { errorType } = this.state;

    if (errorType === 'fetch-geo') {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen,
        errorType: null
      }));
    }
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
