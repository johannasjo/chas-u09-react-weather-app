import React from 'react';
import { useState, useEffect, useContext } from 'react';

const LocationContext = React.createContext({});

export function LocationContextProvider(props) {
  const [locationState, setLocationState] = useState(null);

  // get geolocation
  async function getPosition() {
    // create promise of non promise based API
    const positionPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const {
      coords: { latitude: lat, longitude: lon },
    } = await positionPromise;
    return { lat, lon };
  }

  useEffect(() => {
    async function updatePositionState() {
      const position = await getPosition();
      setLocationState(position);
    }
    updatePositionState();
  }, []);

  return (
    <LocationContext.Provider value={{ currentPosition: locationState }}>
      {props.children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => React.useContext(LocationContext);
