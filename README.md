# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Task

As a user you should be able to:

- See following weather conditions for current position:

  - Temperature
  - Wind strength
  - Humidity
  - Sunrise and sunset (what time)
  - Choose between Fahrenheit and Celsius

- Get a forecast of the coming 5 days (based on above)

  - Short overview of the week
  - Every third hour for the present 24 hours
  - 5-day forecast

## Requirements

- Use weather API (SMHI, YR.NO)

- Use positioning through geolocation in the browser

- Design/color and shape based on weather.com or similar application

## Extra-Dextra

- User can set/search after weather at a certain position manually

- User can save places for forecasts in a list

- User can get graphs of the prognosis over time that includes:
  - Highest/lowest temperature
  - Average temperature (highest and lowest)
  - Average precipitation
  - User can show weather fronts on a map with radar (API can be found here: https://opendata.smhi.se/apidocs/radar/)
