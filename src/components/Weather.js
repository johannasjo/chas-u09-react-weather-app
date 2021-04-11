const Weather = (props) => {
  // destructure props
  const { weather } = props;
  // check if props is undefined
  if (!weather || weather.length === 0)
    return <p>Not able to fetch that weather</p>;
  return (
    // one day prognosis
    <div>
      <h2>Todays weather</h2>
      <div key={weather.id}>
        <h3>City: </h3>
        <span>{weather.name}</span>
        <h3>Temperature: </h3>
        <span>{weather.temp}</span>
        <h3>Wind speed: </h3>
        <span>{weather.windSpeed}</span>
        <h3>Humidity: </h3>
        <span>{weather.humidity}</span>
        <h3>Sunrise: </h3>
        <span>{weather.sunrise}</span>
        <h3>Sunset: </h3>
        <span>{weather.sunset}</span>
      </div>
    </div>

    // 5 day prognosis
    // for each loop in a table?
    // use the 10 day prognosis
  );
};

export default Weather;
