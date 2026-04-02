
import React, { useState, useEffect, useCallback} from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather } from "./api/weatherApi";
import "./styles/App.css";
import clearImag from "./assets/clearweather.png";
import cloudsImg from "./assets/cloudy.png";
import rainImg from "./assets/rainy.jpg";
import defaultBg from "./assets/backgroundimg.png"


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");


 const apiKey = "f6deb6c77f9a5cda8b222a12ac73ee29";


  const handleSearch = async () => {
    setError("");
    if (!city) {
    setError("Please enter a city name");
    return;
    }
    try {
      const data = await fetchWeather(city, apiKey);
      setWeather(data);
    } catch (err) {
       console.log("CATCH ERROR:", err.message); 
      setError(err.message);
      setWeather(null);
    }
     };

   

 const getBackground = useCallback(() => {
  if (!weather) return defaultBg;

  const condition = weather.weather[0].main;

  if (condition === "Clear") return clearImag;
  if (condition === "Clouds") return cloudsImg;

  if (["Rain", "Drizzle", "Thunderstorm"].includes(condition)) {
    return rainImg;
  }

  if (condition === "Snow") return cloudsImg;

  return defaultBg;
}, [weather]);

  useEffect(() => {
  const bg = getBackground();

  document.body.style.backgroundImage = `url(${bg})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}, [getBackground]);




  return (
   <div className="app">
      <h1>Weather App</h1>
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      <WeatherCard weather={weather} />
    </div>
  );
}

export default App;