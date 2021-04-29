// this imports the style as a JS object
import styles from './TempButton.module.css';
import React from 'react';
import { useTemperatureContext } from '../../../context/TemperatureContext';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function TempButtons() {
  const temperatureContext = useTemperatureContext();

  const handleToggleTemp = (event, value) => {
    
    temperatureContext.setUnit(value)
  }

  return (
    <div>
      <ToggleButtonGroup
      value={temperatureContext.unit}
      exclusive
      onChange={handleToggleTemp}
      aria-label='temperature measurement'
      className={styles.toggleBtns}
      >
        <ToggleButton value='metric' aria-label='celcius'><div className={styles.toggleBtn}>C°</div></ToggleButton>
        <ToggleButton value='imperial' aria-label='fahrehnheit'><div className={styles.toggleBtn}>F°</div></ToggleButton>

      </ToggleButtonGroup>
    </div>
  );
}

export default TempButtons;
