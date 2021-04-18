// this imports the style as a JS object
import styles from './TempButton.module.css';
import React, { useState } from 'react';
import { useTemperatureContext } from '../../../context/TemperatureContext';

function TempButton() {
  const [showState, setShowState] = useState(false);
  const temperatureContext = useTemperatureContext();

  // change to react style and not use window.onclick
  window.onclick = function (event) {
    if (!event.target.matches('styles.dropBtn')) {
      const dropdowns = document.getElementsByClassName(
        'styles.dropdownContent'
      );
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('styles.show')) {
          openDropdown.classList.remove('styles.show');
        }
      }
    }
  };

  return (
    <div>
      <div className={styles.tempSelection}>
        <button
          onClick={() => {
            setShowState(!showState);
          }}
          className={styles.dropBtn}
        >
          Temperature
        </button>
        {showState ? (
          <div
            className={styles.tempDropdown}
            className={styles.dropdownContent}
          >
            <a href="#" onClick={() => temperatureContext.setUnit('metric')}>
              Celsius
            </a>
            <a href="#" onClick={() => temperatureContext.setUnit('imperial')}>
              Fahrenheit
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TempButton;
