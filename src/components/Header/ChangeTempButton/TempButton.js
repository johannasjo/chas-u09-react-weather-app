// this imports the style as a JS object
import styles from './TempButton.module.css';
import React, { useState } from 'react';

function TempButton() {
  const [showState, setShowState] = useState(false);
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
            <a href="#">Celsius</a>
            <a href="#">Fahrenheit</a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TempButton;
