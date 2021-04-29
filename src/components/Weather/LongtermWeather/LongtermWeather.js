import { useEffect, useState } from 'react';
import { useCityContext } from '../../../context/CityContext';
import { useLocationContext } from '../../../context/LocationContext';
import { useTemperatureContext } from '../../../context/TemperatureContext';
import styles from './LongtermWeather.module.css';
import Accordion from '../../Accordion/Accordion';

const LongtermWeather = (props) => {
  const [loadingState, setLoadingState] = useState(null);
  const [longtermWeatherState, setLongtermWeatherState] = useState(null);
  const [dailyState, setDailyState] = useState(false);
  const cityContext = useCityContext();
  const locationContext = useLocationContext();
  const temperatureContext = useTemperatureContext();
  const isDailyWeather = props.days === 1;

  const weatherCount = isDailyWeather ? 8 : props.days;

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
      id: item.dt,
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
      id: item.dt,
      dateTime: convertEpochToLocaleTime(item.dt),
      temp: Math.floor(item.main.temp),
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      icon: `${iconUrl}${item.weather[0].icon}.png`,
      main: item.weather[0].main,
    }));
  };

  useEffect(() => {
    setLoadingState(true);
    if (!cityContext) {
      return;
    }

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
    fetch(isDailyWeather ? hourlyWeatherApiUrl : dailyWeatherApiUrl)
      .then((response) => {
        return response.json();
      })
      .then((apiReply) => {
        const weatherData = isDailyWeather
          ? formatHourlyWeatherData(apiReply)
          : formatDailyWeatherData(apiReply);
        setLongtermWeatherState(weatherData);
        setLoadingState(false);
      });
  }, [cityContext, locationContext, temperatureContext, props.days]);

  // check if props is undefined
  if (!longtermWeatherState || longtermWeatherState.length === 0) {
    return <p>Not able to fetch that weather</p>;
  }

  return (
    <>
    {/* // change title of page based on amount of days  */}
      {isDailyWeather ? (
        <h1>24 HOUR PROGNOSIS</h1>
      ) : (
        <h1> {props.days} DAY PROGNOSIS</h1>
      )}

      {/* only pull info on selected amount of days  */}
      {longtermWeatherState.slice(0, weatherCount).map((weatherInfo) => (
        <>
          <Accordion weatherData={weatherInfo} ></Accordion>
        </>
      ))}
    </>
  );
};
export default LongtermWeather;
