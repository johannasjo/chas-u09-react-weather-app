import styles from './App.module.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Weather from './components/Weather/Weather';
import DisplayHeader from './components/Header/DisplayHeader';
import LongtermWeather from './components/Weather/LongtermWeather/LongtermWeather';
import { LocationContextProvider } from './context/LocationContext';
import { CityContextProvider } from './context/CityContext';
import { TemperatureContextProvider } from './context/TemperatureContext';

function App() {
  return (
    <TemperatureContextProvider>
      <LocationContextProvider>
        <CityContextProvider>
          <Router>
            <DisplayHeader />
            <Switch>
              <Route exact path="/">
                <Redirect to={`/today`} />
              </Route>
              <Route path="/today" component={Weather}></Route>
              <Route
                path="/longterm"
                render={(props) => {
                  let days = 7;
                  if (props?.location?.search) {
                    days = +new URLSearchParams(props.location.search).get(
                      'days'
                    );
                  }

                  return <LongtermWeather days={days} />;
                }}
              ></Route>
            </Switch>
          </Router>
        </CityContextProvider>
      </LocationContextProvider>
    </TemperatureContextProvider>
  );
}

export default App;
