import React from 'react';
import './WeatherIcon.css';

const WeatherIcon = ({ icon, description }) => (
  <React.Fragment>
    <div className="icon-container">
      <img className="icon-image" src={icon} alt={description} />
    </div>
    <p className="icon-description">{description}</p>
  </React.Fragment>
);

export default WeatherIcon;
