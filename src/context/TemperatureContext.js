import React from 'react';
import { useState } from 'react';

export const TemperatureContext = React.createContext({
  unit: 'metric',
  setUnit: () => {},
});

export function TemperatureContextProvider(props) {
  const initState = {
    unit: 'metric',
    setUnit,
  };

  const [unitState, setUnitState] = useState(initState);

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
