import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useLocationContext } from './LocationContext';

const CityContext = React.createContext({});

export function CityContextProvider(props) {
  const [cityState, setCityState] = useState(null);
  const locationContext = useLocationContext();

  // get geolocation
  async function getCityByLocation(lat, lon) {
    const result = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    return result.json();
  }

  useEffect(() => {
    if (locationContext.currentPosition === null || locationContext.currentPosition === undefined) {
      return;
    }
    // destructure coordinates from geolocation api
    const { currentPosition } = locationContext;

    async function updateCityState() {
      const city = await getCityByLocation(
        currentPosition.lat,
        currentPosition.lon
      );

      // set city name to api reply for those coordinates
      setCityState(city[0].name);
    }
    console.log(locationContext.currentPosition);
    updateCityState();
  }, [locationContext]);

  return (
    // pass in the value and props so it's accessible in other components
    <CityContext.Provider value={cityState}>
      {props.children}
    </CityContext.Provider>
  );
}

export const useCityContext = () => React.useContext(CityContext);
