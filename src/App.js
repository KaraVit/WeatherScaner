import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const weatherApiKey = '3ac5d99f53f1d82b91bd8a002875cc92'; 
  const geocodeApiUrl = 'https://nominatim.openstreetmap.org/search'; 

  
  const getCoordinates = async (cityName) => {
    try {
      const response = await axios.get(geocodeApiUrl, {
        params: {
          q: cityName,
          format: 'json',
          addressdetails: 1,
        },
      });
      if (response.data.length > 0) {
        const cityData = response.data[0];
        const latitude = cityData.lat;
        const longitude = cityData.lon;
        setLat(latitude);
        setLon(longitude);
        setError('');
        getWeather(latitude, longitude); 
      } else {
        setError('Город не найден');
        setWeather(null);
      }
    } catch (err) {
      setError('Ошибка при геокодировании');
    }
  };

  
  const getWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: latitude,
          lon: longitude,
          appid: weatherApiKey,
          units: 'metric', 
        },
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Ошибка: Невозможно получить данные о погоде');
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (!city) return;
    getCoordinates(city);
  };

  return (
    <div className="App">
      <h1>Погода в вашем городе</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введите название города"
      />
      <button onClick={handleSearch}>Поиск</button>

      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Температура: {weather.main.temp} °C</p>
          <p>Влажность: {weather.main.humidity} %</p>
          <p>Скорость ветра: {weather.wind.speed} м/с</p>
        </div>
      )}
    </div>
  );
};

export default App;
