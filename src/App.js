import './App.css';
import { useEffect, useState } from 'react';
import Weather from './components/Weather';
import DisplayHeader from './components/Header/DisplayHeader';

function App() {
  const [loadingState, setLoadingState] = useState(null);
  const [weatherState, setWeatherState] = useState(null);
  const [locationState, setLocationState] = useState(null);

  // get geolocation

  function getPosition() {
    // convert non-promised based API ti promise-based
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  // navigator.geolocation.getCurrentPosition(
  //   (pos) => {},
  //   (error) => {
  //     console.warn(`ERROR(${error.code}): ${error.message}`);
  //   }
  // );

  // convert time for sunrise/sunset
  function convertEpochToLocaleTime(epochTime) {
    return new Date(parseInt(epochTime) * 1000).toLocaleTimeString();
  }

  // use geolocation to fetch weather for that position
  useEffect(() => {
    setLoadingState(true);
    getPosition()
      .then((pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        return { lat, lon };
      })
      // get keys from the incoming object
      .then(({ lat, lon }) => {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
          .then((response) => {
            return response.json();
          })
          .then((apiReply) => {
            setWeatherState(formatWeatherData(apiReply));
            setLoadingState(false);
          });
      });
  }, []);

  const formatWeatherData = (apiReply) => ({
    name: apiReply.name,
    country: apiReply.sys.country,
    id: apiReply.id,
    temp: apiReply.main.temp,
    humidity: apiReply.main.humidity,
    windSpeed: apiReply.wind.speed,
    sunrise: convertEpochToLocaleTime(apiReply.sys.sunrise),
    sunset: convertEpochToLocaleTime(apiReply.sys.sunset),
  });

  return (
    <div className="App">
      <DisplayHeader />
      {weatherState && <Weather weather={weatherState} />}
    </div>
  );
}

export default App;
