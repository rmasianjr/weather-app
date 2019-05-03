import React from 'react';

import WeatherIcon from '../WeatherIcon/WeatherIcon';
import './Weather.css';

const Weather = ({ weatherData, temperature, unit }) => {
  const { status, description, place } = weatherData;

  return (
    <div className="weather-data">
      <WeatherIcon status={status} description={description} />
      <p className="weather-data-place">{place}</p>
      <p className="weather-data-temp">
        {temperature}
        {unit === 'celcius' ? '° C' : '° F'}
      </p>
    </div>
  );
};

export default Weather;
