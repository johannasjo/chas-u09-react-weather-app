import './App.css';
import { useEffect, useState } from 'react';
import Weather from './components/Weather';

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
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`
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
    id: apiReply.id,
  });

  return (
    <div className="App">
      <div className="container">
        <h2>Todays weather</h2>
      </div>
      {weatherState && <Weather weather={weatherState} />}
    </div>
  );
}

export default App;
