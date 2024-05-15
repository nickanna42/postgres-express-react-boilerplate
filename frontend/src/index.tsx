/**
This bootstraps the overall react application
**/

// React dependencies
import ReactDOM from 'react-dom';

// Redux and react-redux dependencies
import { Provider as ReduxProvider } from 'react-redux';
import { store as reduxStore }  from './reduxElements';

// Style Helpers
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto';

// Material-UI Style provider dependencies
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './styles/materialThemes';


// React Application entry-point
import App from './App';

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <ReduxProvider store={reduxStore}>
      <App />
    </ReduxProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
