const Weather = (props) => {
  const { weather } = props;
  if (!weather || weather.length === 0)
    return <p>Not able to fetch that weather</p>;
  return (
    <div>
      <h2>Weather</h2>
      <div key={weather.id}>
        <span>{weather.name}</span>
      </div>
    </div>
  );
};

export default Weather;
