import React from 'react';
import PropTypes from 'prop-types';

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

WeatherIcon.propTypes = {
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  timeInHour: PropTypes.number.isRequired
};

export default WeatherIcon;
