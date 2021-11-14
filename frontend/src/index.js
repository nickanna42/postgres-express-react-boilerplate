/**
This bootstraps the overall react application
**/

// React dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Redux and react-redux dependencies
import { createStore } from 'redux';
import reduxReducer from './reduxElements/index';
import { Provider as ReduxProvider } from 'react-redux';

// Material-UI Style provider dependencies
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './styles/materialThemes';

// React Application entry-point
import App from './App';

// creates the redux store
const reduxStore = createStore(
  reduxReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // this lets you use the browser redux viewer, if your browser has that plugin
);

// places the react application on the DOM
ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <ReduxProvider store={reduxStore}>
      <App />
    </ReduxProvider>
  </ThemeProvider>,
  document.getElementById('root')
);