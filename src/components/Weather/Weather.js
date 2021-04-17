import styles from './Weather.module.css';

const Weather = (props) => {
  // destructure props
  const { weather } = props;
  // check if props is undefined
  if (!weather || weather.length === 0)
    return <p>Not able to fetch that weather</p>;
  return (
    // one day prognosis
    <div className={styles.card}>
      <span className={styles.cardTitle}>
        Todays weather in {weather.name}, {weather.country}
      </span>
      <span className={styles.cardSubtitle}>
        As of {new Date().toLocaleTimeString()}
      </span>
      <div key={weather.id}>
        <div className={styles.tempWrapper}>
          <h1 className={styles.tempCelcius}>{weather.temp}°C</h1>
          <div className={styles.iconWrapper}>
            <img
              src={weather.icon}
              className={styles.weatherIcon}
              alt="icon symbolizing hte weather today"
            />
            <h2>{weather.main}</h2>
          </div>
        </div>
        <div className={styles.subCats}>
          <div className={styles.wrapper}>
            <h3>Wind speed: </h3>
            <span>{weather.windSpeed} meter/s</span>
          </div>
          <div className={styles.wrapper}>
            <h3>Humidity: </h3>
            <span>{weather.humidity}%</span>
          </div>
          <div className={styles.wrapper}>
            <h3>Sunrise: </h3>
            <span>{weather.sunrise}</span>
          </div>
          <div className={styles.wrapper}>
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
