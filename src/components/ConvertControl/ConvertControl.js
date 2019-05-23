import React from 'react';
import './ConvertControl.css';

const ConvertControl = ({ convertTo, unit }) => (
  <div className="con-ctrl">
    <input
      className="con-ctrl-switch"
      type="checkbox"
      id="convert"
      onChange={convertTo}
      checked={unit === 'fahrenheit' ? true : false}
    />
    <label
      className="toggle-switch"
      htmlFor="convert"
      data-temp-off="Fahrenheit"
      data-temp-on="Celsius"
    />
  </div>
);

export default ConvertControl;
