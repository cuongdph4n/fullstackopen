import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Weather = ({ lat, long }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!lat || !long) return;

    weatherService.getWeatherByCoordinates(lat, long).then((weatherData) => {
      setWeather(weatherData);
    });
  }, [lat, long]);

  if (!weather) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
