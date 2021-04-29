import React from 'react';
import { useState } from 'react';

export const TemperatureContext = React.createContext({
  unit: 'metric',
  setUnit: () => {},
});


export function TemperatureContextProvider(props) {
  /**
   * set initial unit value to metric, as the API fetch metric as default
   */
  const initState = {
    unit: 'metric',
    setUnit,
  };

  const [unitState, setUnitState] = useState(initState);
  /**
   * 'overwrite' unit to the passed in value from the component
   * @param {string} unit 
   */
  function setUnit(unit) {
    setUnitState({ ...unitState, unit });
  }

  return (
    <TemperatureContext.Provider value={unitState}>
      {props.children}
    </TemperatureContext.Provider>
  );
}

export const useTemperatureContext = () => React.useContext(TemperatureContext);
