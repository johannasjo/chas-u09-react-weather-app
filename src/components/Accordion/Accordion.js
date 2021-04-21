import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './Accordion.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function SimpleAccordion({ weatherData }) {
  const classes = useStyles();
  /**
   * contains a sun information html-element if both sunrise/sunset data is available
   */
  const sunInformation =
    weatherData.sunrise && weatherData.sunset ? (
      <>
        <p className={styles.info}>Sunrise {weatherData.sunrise}</p>
        <p className={styles.info}>Sunset {weatherData.sunset}</p>
      </>
    ) : null;

  return (
    <div className={styles.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.heading + ' ' + styles.row}>
            <p className={styles.date}>{weatherData.dateTime}</p>
            <p className={styles.temp}>{weatherData.temp}°</p>
            <div className={styles.weatherContainer}>
              <img
                src={weatherData.icon}
                className={styles.weatherIcon}
                alt="icon symbolizing the weather today"
              />
              <p className={styles.weatherText}>{weatherData.main}</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles.accordionBox}>
            <p className={styles.info}>Wind: {weatherData.windSpeed} m/s</p>
            <p className={styles.info}>Humidity: {weatherData.humidity}%</p>
            {sunInformation}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SimpleAccordion;
