import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '3ac5d99f53f1d82b91bd8a002875cc92';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => setError('Не удалось получить геолокацию')
    );
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: { lat, lon, appid: apiKey, units: 'metric' },
        }
      );
      setWeather(response.data);
      setError('');
    } catch {
      setError('Ошибка загрузки данных');
    }
  };

  const handleSearch = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: { q: city, appid: apiKey, units: 'metric' },
        }
      );
      setWeather(response.data);
      setError('');
    } catch {
      setError('Город не найден');
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      {}
      <aside className="sidebar">
        <h2 className="logo">WeatherApp</h2>
        <nav className="menu">
          <ul>
            <li><i className="bi bi-house-door"></i> Dashboard</li>
            <li><i className="bi bi-map"></i> Map</li>
            <li><i className="bi bi-bookmark"></i> Saved</li>
            <li><i className="bi bi-calendar"></i> Calendar</li>
            <li><i className="bi bi-gear"></i> Settings</li>
          </ul>
        </nav>
      </aside>

      {}
      <main className="content">
        {}
        <header className="header">
          <input 
            type="text" 
            className="search-bar" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Введите город..." 
          />
          <button className="btn btn-primary" onClick={handleSearch}>Поиск</button>
        </header>

        {}
        <div className="weather-card">
          {error && <p className="alert alert-danger">{error}</p>}

          {weather && (
            <div className="weather-info">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <p>🌡 Температура: {weather.main.temp} °C</p>
              <p>💧 Влажность: {weather.main.humidity} %</p>
              <p>💨 Ветер: {weather.wind.speed} м/с</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WeatherApp;
