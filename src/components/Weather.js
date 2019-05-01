import React from 'react';

import WeatherIcon from './WeatherIcon';

const Weather = ({ weatherData }) => {
  const { icon, description, place, temperature } = weatherData;

  return (
    <div>
      <WeatherIcon icon={icon} description={description} />
      <p>{place}</p>
      <p>{temperature} ° C</p>
    </div>
  );
};

export default Weather;
