import { useEffect, useState } from 'react';
import { useCityContext } from '../../../context/CityContext';
import { useLocationContext } from '../../../context/LocationContext';
import { useTemperatureContext } from '../../../context/TemperatureContext';
import styles from './LongtermWeather.module.css';

const LongtermWeather = (props) => {
  const [loadingState, setLoadingState] = useState(null);
  const [longtermWeatherState, setLongtermWeatherState] = useState(null);
  const [dailyState, setDailyState] = useState(false);
  const cityContext = useCityContext();
  const locationContext = useLocationContext();
  const temperatureContext = useTemperatureContext();

  function convertEpochToLocaleTime(epochTime) {
    return new Date(parseInt(epochTime) * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function convertEpochToLocaleDate(epochTime) {
    return new Date(parseInt(epochTime) * 1000).toLocaleDateString([], {
      day: '2-digit',
    });
  }

  const iconUrl = 'http://openweathermap.org/img/wn/';

  const formatDailyWeatherData = (apiReply) => {
    return apiReply.daily.map((item) => ({
      dateTime: convertEpochToLocaleDate(item.dt),
      temp: Math.floor(item.temp.day),
      humidity: item.humidity,
      windSpeed: item.wind_speed,
      icon: `${iconUrl}${item.weather[0].icon}.png`,
      main: item.weather[0].main,
      sunrise: convertEpochToLocaleTime(item.sunrise),
      sunset: convertEpochToLocaleTime(item.sunset),
    }));
  };

  const formatHourlyWeatherData = (apiReply) => {
    return apiReply.list.map((item) => ({
      dateTime: convertEpochToLocaleTime(item.dt),
      temp: Math.floor(item.main.temp),
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      icon: `${iconUrl}${item.weather[0].icon}.png`,
      main: item.weather[0].main,
    }));
  };

  // get 3-hour and 5-day prognosis
  useEffect(() => {
    setLoadingState(true);
    // get keys from the incoming object
    if (!cityContext) {
      return;
    }

    const isDailyWeather = new URLSearchParams(props.location.search).has(
      'daily'
    );
    setDailyState(isDailyWeather);
    const { currentPosition } = locationContext;

    const dailyWeatherQueryParams = new URLSearchParams({
      lat: currentPosition.lat,
      lon: currentPosition.lon,
      units: temperatureContext.unit,
      exclude: 'alerts,hourly,minutely',
      appid: process.env.REACT_APP_WEATHER_API_KEY,
    });
    const dailyWeatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?${dailyWeatherQueryParams.toString()}`;
    const hourlyWeatherQueryParams = new URLSearchParams({
      q: cityContext,
      units: temperatureContext.unit,
      cnt: 8,
      appid: process.env.REACT_APP_WEATHER_API_KEY,
    });
    const hourlyWeatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast/?${hourlyWeatherQueryParams.toString()}`;
    fetch(isDailyWeather ? dailyWeatherApiUrl : hourlyWeatherApiUrl)
      .then((response) => {
        return response.json();
      })
      .then((apiReply) => {
        console.log({ longtermWeatherApiReply: apiReply });
        const weatherData = isDailyWeather
          ? formatDailyWeatherData(apiReply)
          : formatHourlyWeatherData(apiReply);
        setLongtermWeatherState(weatherData);
        setLoadingState(false);
      });
  }, [cityContext, locationContext, temperatureContext, props.location.search]);

  // check if props is undefined
  if (!longtermWeatherState || longtermWeatherState.length === 0)
    return <p>Not able to fetch that weather</p>;
  return (
    <div className={styles.flexContainer}>
      {dailyState ? <h1>5 DAY PROGNOSIS</h1> : <h1>24 HOUR PROGNOSIS</h1>}

      <table className={styles.container}>
        {longtermWeatherState.map((weatherInfo) => (
          <tr className={styles.row}>
            <td className={styles.date}>{weatherInfo.dateTime}</td>
            <td className={styles.temp}>{weatherInfo.temp}°</td>
            <td>
              <img
                src={weatherInfo.icon}
                className={styles.weatherIcon}
                alt="icon symbolizing the weather today"
              />
            </td>

            {dailyState ? (
              <>
                <td>Sunrise: {weatherInfo.sunrise}</td>
                <td>Sunset: {weatherInfo.sunset}</td>
              </>
            ) : null}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default LongtermWeather;
