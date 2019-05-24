import React from 'react';
import PropTypes from 'prop-types';

import WeatherIcon from '../WeatherIcon/WeatherIcon';
import './Weather.css';

const Weather = ({ weatherData, temperature, unit }) => {
  const { status, description, place, timeInHour } = weatherData;

  return (
    <div className="weather-data">
      <WeatherIcon
        status={status}
        description={description}
        timeInHour={timeInHour}
      />
      <div className="search-icon" />
      <div className="weather-marker" />
      <p className="weather-data-place">{place}</p>
      <p className="weather-data-temp">
        {temperature}
        {unit === 'celsius' ? '° C' : '° F'}
      </p>
    </div>
  );
};

Weather.propTypes = {
  weatherData: PropTypes.shape({
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    timeInHour: PropTypes.number.isRequired
  }),
  temperature: PropTypes.string.isRequired,
  unit: PropTypes.oneOf(['celsius', 'fahrenheit']).isRequired
};

export default Weather;
