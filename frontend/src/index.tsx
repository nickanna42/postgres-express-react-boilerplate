/**
This bootstraps the overall react application
**/

// React dependencies
import { createRoot } from 'react-dom/client';

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

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root not found');
}

createRoot(container).render(
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <ReduxProvider store={reduxStore}>
      <App />
    </ReduxProvider>
  </ThemeProvider>
);
