import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState("India");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [key] = useState('ebb63a336ba64a41a8a84704241107');

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFetchWeather = () => {
    fetchWeather();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input 
          type="text" 
          name="location" 
          value={location} 
          onChange={handleLocationChange} 
        />
        <button onClick={handleFetchWeather}>Get Weather</button>
        {error ? (
          <p>{error}</p>
        ) : weather ? (
          <div>
            <h2>{weather.location.name}</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Weather: {weather.current.condition.text}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
