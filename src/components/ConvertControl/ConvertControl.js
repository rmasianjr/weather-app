import React from 'react';
import './ConvertControl.css';

const ConvertControl = ({ convertTo }) => (
  <div className="con-ctrl">
    <input
      className="con-ctrl-switch"
      type="checkbox"
      id="convert"
      onChange={convertTo}
    />
    <label
      className="toggle-switch"
      htmlFor="convert"
      data-temp-off="Fahrenheit"
      data-temp-on="Celcius"
    />
  </div>
);

export default ConvertControl;
