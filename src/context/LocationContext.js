import React from 'react';
import { useState, useEffect, useContext } from 'react';

const LocationContext = React.createContext({});

export function LocationContextProvider(props) {
  const [locationState, setLocationState] = useState(null);

  // get geolocation
  async function getPosition() {
    /**
     * create promise of non promise based API:
     * https://stackblitz.com/edit/js-naive-promise-example?file=index.js
     */
    const positionPromise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    try {
      const {
        coords: { latitude: lat, longitude: lon }
      } = await positionPromise;
      return { lat, lon };
    } catch (error) {
      console.log('Error while getting current position', error);
      throw error;
    }
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
