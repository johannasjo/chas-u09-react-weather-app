import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Weather from './components/Weather/Weather';
import DisplayHeader from './components/Header/DisplayHeader';
import LongtermWeather from './components/Weather/LongtermWeather/LongtermWeather';

function App() {
  const [loadingState, setLoadingState] = useState(null);
  const [currentWeatherState, setCurrentWeatherState] = useState(null);
  const [longtermWeatherState, setLongtermWeatherState] = useState(null);
  const [locationState, setLocationState] = useState(null);

  // get geolocation
  function getPosition() {
    // convert non-promised based API ti promise-based
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  // convert time for sunrise/sunset
  function convertEpochToLocaleTime(epochTime) {
    return new Date(parseInt(epochTime) * 1000).toLocaleTimeString();
  }

  // use geolocation to fetch weather for that position
  useEffect(() => {
    setLoadingState(true);
    getPosition()
      .then((pos) => {
        console.log({ currentPosition: pos });
        const { latitude: lat, longitude: lon } = pos.coords;
        return { lat, lon };
      })
      // get keys from the incoming object
      .then(({ lat, lon }) => {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
          .then((response) => {
            return response.json();
          })
          .then((apiReply) => {
            console.log({ currentWeatherApiReply: apiReply });
            setCurrentWeatherState(formatWeatherData(apiReply));
            setLoadingState(false);
          });
      });
  }, []);

  const iconUrl = 'http://openweathermap.org/img/wn/';

  const formatWeatherData = (apiReply) => ({
    name: apiReply.name,
    country: apiReply.sys.country,
    id: apiReply.id,
    temp: Math.floor(apiReply.main.temp),
    humidity: apiReply.main.humidity,
    windSpeed: apiReply.wind.speed,
    sunrise: convertEpochToLocaleTime(apiReply.sys.sunrise),
    sunset: convertEpochToLocaleTime(apiReply.sys.sunset),
    icon: `${iconUrl}${apiReply.weather[0].icon}.png`,
    main: apiReply.weather[0].main,
  });

  return (
    <Router>
      <DisplayHeader />
      <Switch>
        <Route exact path="/">
          <Redirect to={`/today`} />{' '}
        </Route>
        <Route path="/today">
          {currentWeatherState && <Weather weather={currentWeatherState} />}
        </Route>
        <Route path="/longterm">
          <LongtermWeather />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
