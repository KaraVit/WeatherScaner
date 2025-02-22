import axios from 'axios';

const apiKey = '3ac5d99f53f1d82b91bd8a002875cc92';

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params: { lat, lon, appid: apiKey, units: 'metric' } }
    );
    return response.data;
  } catch {
    throw new Error('Ошибка загрузки данных');
  }
};

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params: { q: city, appid: apiKey, units: 'metric' } }
    );
    return response.data;
  } catch {
    throw new Error('Город не найден');
  }
};
