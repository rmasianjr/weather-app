import React from 'react';

const WeatherIcon = ({ icon, description }) => (
  <div>
    <img src={icon} alt={description} />
  </div>
);

export default WeatherIcon;
