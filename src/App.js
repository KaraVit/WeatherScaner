import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h1 className="text-center mb-4">Погода в вашем городе</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Введите название города"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Поиск
          </button>
        </div>

        {error && <p className="alert alert-danger">{error}</p>}

        {weather && (
          <div className="text-center">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p className="fs-4">🌡 Температура: {weather.main.temp} °C</p>
            <p className="fs-5">💧 Влажность: {weather.main.humidity} %</p>
            <p className="fs-5">💨 Скорость ветра: {weather.wind.speed} м/с</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
