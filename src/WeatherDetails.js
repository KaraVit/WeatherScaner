// src/components/WeatherDetails.js

import React from 'react';

const WeatherDetails = ({ label, value, icon }) => (
  <div className="weather-detail">
    <span className="weather-detail-label">{label}:</span>
    <span className="weather-detail-value">{value}</span>
    {icon && <img className="weather-icon" src={icon} alt="Weather Icon" />}
  </div>
);

export default WeatherDetails;
