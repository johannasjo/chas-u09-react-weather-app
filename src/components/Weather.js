import '../style/Weather.css';

const Weather = (props) => {
  // destructure props
  const { weather } = props;
  // check if props is undefined
  if (!weather || weather.length === 0)
    return <p>Not able to fetch that weather</p>;
  return (
    // one day prognosis
    <div class="card">
      <span class="card-title">
        Todays weather in {weather.name}, {weather.country}
      </span>
      <span class="card-subtitle">As of {new Date().toLocaleTimeString()}</span>
      <div key={weather.id}>
        <h1 class="temp">{weather.temp}</h1>
        <div class="sub-cats">
          <div class="wrapper">
            <h3>Wind speed: </h3>
            <span>{weather.windSpeed} meter/s</span>
          </div>
          <div class="wrapper">
            <h3>Humidity: </h3>
            <span>{weather.humidity}%</span>
          </div>
          <div class="wrapper">
            <h3>Sunrise: </h3>
            <span>{weather.sunrise}</span>
          </div>
          <div class="wrapper">
            <h3>Sunset: </h3>
            <span>{weather.sunset}</span>
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
