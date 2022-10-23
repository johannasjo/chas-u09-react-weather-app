import styles from './Weather.module.css';
import { useState, useEffect } from 'react';
import { useLocationContext } from '../../context/LocationContext';

const Weather = (props) => {
  const [loadingState, setLoadingState] = useState(null);
  const [currentWeatherState, setCurrentWeatherState] = useState(null);
  const locationContext = useLocationContext();

  // convert time for sunrise/sunset
  function convertEpochToLocaleTime(epochTime) {
    return new Date(parseInt(epochTime) * 1000).toLocaleTimeString();
  }

  // use geolocation to fetch weather for that position
  useEffect(() => {
    if (locationContext.currentPosition === null) {
      return;
    }
    setLoadingState(true);

    // destructure coordinates from api
    const { currentPosition } = locationContext;

    // get keys from the incoming object

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.lat}&lon=${currentPosition.lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((apiReply) => {
        console.log({ currentWeatherApiReply: apiReply });
        setCurrentWeatherState(formatWeatherData(apiReply));
        setLoadingState(false);
      });
  }, [locationContext]);

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

  // check if currentWeatherState is undefined
  if (!currentWeatherState || currentWeatherState.length === 0)
    return <p>Not able to fetch that weather</p>;
  return (
    // one day prognosis
    <div className={styles.card}>
      <span className={styles.cardTitle}>
        Todays weather in {currentWeatherState.name},{' '}
        {currentWeatherState.country}
      </span>
      <span className={styles.cardSubtitle}>
        As of {new Date().toLocaleTimeString()}
      </span>
      <div key={currentWeatherState.id}>
        <div className={styles.tempWrapper}>
          <h1 className={styles.tempCelcius}>{currentWeatherState.temp}°C</h1>
          <div className={styles.iconWrapper}>
            <img
              src={currentWeatherState.icon}
              className={styles.weatherIcon}
              alt="icon symbolizing hte weather today"
            />
            <h2>{currentWeatherState.main}</h2>
          </div>
        </div>
        <div className={styles.subCats}>
          <div className={styles.wrapper}>
            <h3>Wind speed: </h3>
            <span>{currentWeatherState.windSpeed} meter/s</span>
          </div>
          <div className={styles.wrapper}>
            <h3>Humidity: </h3>
            <span>{currentWeatherState.humidity}%</span>
          </div>
          <div className={styles.wrapper}>
            <h3>Sunrise: </h3>
            <span>{currentWeatherState.sunrise}</span>
          </div>
          <div className={styles.wrapper}>
            <h3>Sunset: </h3>
            <span>{currentWeatherState.sunset}</span>
          </div>
        </div>
      </div>
    </div>

    // 5 day prognosis
    // for each loop in a table?
    // use the 10 day prognosis and the weather array to get overview and icon
  );
};

export default Weather;
