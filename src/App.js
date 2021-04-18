import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
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

function App() {
  return (
    <LocationContextProvider>
      <CityContextProvider>
        <Router>
          <DisplayHeader />
          <Switch>
            <Route exact path="/">
              <Redirect to={`/today`} />{' '}
            </Route>
            <Route path="/today" component={Weather}></Route>
            <Route path="/longterm" component={LongtermWeather}></Route>
          </Switch>
        </Router>
      </CityContextProvider>
    </LocationContextProvider>
  );
}

export default App;
