import React from 'react';
import './ConvertControl.css';

const ConvertControl = ({ convertTo, unit }) => (
  <div className="con-ctrl">
    <input
      id="rad1"
      type="radio"
      name="convert"
      value="celcius"
      onChange={() => convertTo('celcius')}
      checked={unit === 'celcius'}
    />
    <label htmlFor="rad1">Celcius</label>
    <input
      id="rad2"
      type="radio"
      name="convert"
      value="fahrenheit"
      onChange={() => convertTo('fahrenheit')}
      checked={unit === 'fahrenheit'}
    />
    <label htmlFor="rad2">Fahrenheit</label>
  </div>
);

export default ConvertControl;
