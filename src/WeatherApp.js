// src/WeatherApp.js

import React, { useState, useEffect } from 'react';
import { fetchWeatherByCoords, fetchWeatherByCity } from './WeatherService';
import WeatherCard from './WeatherCard';
import Sidebar from './Sidebar';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  // Получаем текущие координаты пользователя и запрашиваем данные о погоде
  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const data = await fetchWeatherByCoords(latitude, longitude);
        setWeather(formatWeatherData(data));
      } catch (err) {
        setError('Ошибка загрузки данных о погоде: ' + err.message);
      }
    };

    // Получаем геолокацию пользователя
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => setError('Не удалось получить геолокацию')
    );
  }, []);

  // Функция поиска погоды по названию города
  const handleSearch = async (city) => {
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(formatWeatherData(data));
      setError('');
    } catch (err) {
      setError('Город не найден: ' + err.message);
      setWeather(null);
    }
  };

  // Форматируем данные погоды
  const formatWeatherData = (data) => {
    return {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      icon: data.weather[0].icon
    };
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className="content">
        <Header onSearch={handleSearch} />
        <WeatherCard weather={weather} error={error} />
      </main>
    </div>
  );
};

export default WeatherApp;
