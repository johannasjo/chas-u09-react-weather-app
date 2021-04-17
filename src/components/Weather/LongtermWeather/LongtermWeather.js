import { useEffect, useState } from 'react';

import styles from './LongtermWeather.module.css';

const LongtermWeather = (props) => {
  // destructure props
  const { weather } = props;

  const [loadingState, setLoadingState] = useState(null);
  const [longtermWeatherState, setLongtermWeatherState] = useState(null);

  function convertEpochToLocaleTime(epochTime) {
    return new Date(parseInt(epochTime) * 1000).toLocaleTimeString();
  }

  const iconUrl = 'http://openweathermap.org/img/wn/';

  const formatWeatherData = (apiReply) => {
    return apiReply.list.map((item) => ({
      dateTime: convertEpochToLocaleTime(item.dt),
      temp: Math.floor(item.main.temp),
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      icon: `${iconUrl}${item.weather[0].icon}.png`,
      main: item.weather[0].main,
      // sunrise & sunset
    }));
  };

  // get 3-hour and 5-day prognosis
  useEffect(() => {
    setLoadingState(true);
    // get keys from the incoming object

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&cnt=8&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((apiReply) => {
        setLongtermWeatherState(formatWeatherData(apiReply));
        console.log(formatWeatherData(apiReply));
        setLoadingState(false);
      });
  }, []);

  // check if props is undefined
  if (!longtermWeatherState || longtermWeatherState.length === 0)
    return <p>Not able to fetch that weather</p>;
  return (
    <div>
      <h1>24 hour weather forecast</h1>
      <table>
        {longtermWeatherState.map((weatherInfo) => (
          <tr>
            <td>{weatherInfo.dateTime}</td>
            <td>
              <img
                src={weatherInfo.icon}
                className={styles.weatherIcon}
                alt="icon symbolizing hte weather today"
              />
            </td>
            <td>{weatherInfo.temp} C</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default LongtermWeather;
