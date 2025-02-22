// src/components/WeatherCard.js

import React from 'react';
import WeatherDetails from './WeatherDetails';
import ErrorMessage from './ErrorMessage';

const WeatherCard = ({ weather, error }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!weather) {
    return <p>Загружаем данные...</p>;
  }

  const weatherIcon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2 className="weather-card-title">
        {weather.city}, {weather.country}
      </h2>

      <div className="weather-info">
        {/* Каждый компонент WeatherDetails будет отдельным блоком */}
        <div className="weather-block">
          <WeatherDetails label="Температура" value={`${weather.temp} °C`} />
        </div>

        <div className="weather-block">
          <WeatherDetails label="Влажность" value={`${weather.humidity} %`} />
        </div>

        <div className="weather-block">
          <WeatherDetails label="Ветер" value={`${weather.wind} м/с`} />
        </div>
      </div>

      <div className="weather-icon-container">
        <img
          className="weather-icon-large"
          src={weatherIcon}
          alt="Weather Icon"
        />
      </div>
    </div>
  );
};

export default WeatherCard;

