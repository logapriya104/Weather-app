
import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: details } = weather;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <h3>{main.temp} °C</h3>
      <p>{details[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${details[0].icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
};

export default WeatherCard;