import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeatherByCoordinates = (lat, lon) => {
  const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  return request.then((response) => response.data);
};

export default {
  getWeatherByCoordinates,
};
