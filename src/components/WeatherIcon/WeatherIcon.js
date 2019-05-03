import React from 'react';
import './WeatherIcon.css';
import { getIcon } from '../../helper/iconGenerator';

const WeatherIcon = ({ status, description }) => (
  <React.Fragment>
    <p className="icon-weather">
      <i className={`wi wi-${getIcon(status)}`} />
    </p>
    <p className="icon-description">{description}</p>
  </React.Fragment>
);

export default WeatherIcon;
