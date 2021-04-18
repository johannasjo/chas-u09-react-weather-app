import { useEffect, useState } from 'react';
import { useCityContext } from '../../../context/CityContext';
import { useLocationContext } from '../../../context/LocationContext';
import { useTemperatureContext } from '../../../context/TemperatureContext';
import styles from './LongtermWeather.module.css';

const LongtermWeather = (props) => {
  const [loadingState, setLoadingState] = useState(null);
  const [longtermWeatherState, setLongtermWeatherState] = useState(null);
  const cityContext = useCityContext();
  const locationContext = useLocationContext();
  const temperatureContext = useTemperatureContext();

  function convertEpochToLocaleTime(epochTime) {
    return new Date(parseInt(epochTime) * 1000).toLocaleTimeString();
  }

  function convertEpochToLocaleDate(epochTime) {
    return new Date(parseInt(epochTime) * 1000).toLocaleDateString();
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
      // sunrise & sunset
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
      // sunrise & sunset
    }));
  };

  // get 3-hour and 5-day prognosis
  useEffect(() => {
    setLoadingState(true);
    // get keys from the incoming object
    if (!cityContext) {
      return;
    }

    const daily = new URLSearchParams(props.location.search).has('daily');

    const { currentPosition } = locationContext;

    const dailyWeatherQueryParams = new URLSearchParams({
      lat: currentPosition.lat,
      lon: currentPosition.lon,
      units: temperatureContext.unit,
      exclude: 'alerts,current,hourly,minutely',
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
    fetch(daily ? dailyWeatherApiUrl : hourlyWeatherApiUrl)
      .then((response) => {
        return response.json();
      })
      .then((apiReply) => {
        console.log({ longtermWeatherApiReply: apiReply });
        const weatherData = daily
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
