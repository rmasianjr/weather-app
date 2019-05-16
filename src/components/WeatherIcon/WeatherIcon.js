import React from 'react';
import './WeatherIcon.css';
import { getIcon } from '../../helper/iconGenerator';

const WeatherIcon = ({ status, description, timeInHour }) => (
  <React.Fragment>
    <p className="icon-weather">
      <i className={`wi wi-${getIcon(status, timeInHour)}`} />
    </p>
    <p className="icon-description">{description}</p>
  </React.Fragment>
);

export default WeatherIcon;
