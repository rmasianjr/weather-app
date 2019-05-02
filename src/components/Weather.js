import React from 'react';

import WeatherIcon from './WeatherIcon';

const Weather = ({ weatherData, temperature, unit }) => {
  const { icon, description, place } = weatherData;

  return (
    <div>
      <WeatherIcon icon={icon} description={description} />
      <p>{place}</p>
      <p>
        {temperature}
        {unit === 'celcius' ? '° C' : '° F'}
      </p>
    </div>
  );
};

export default Weather;
