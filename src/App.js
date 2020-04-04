import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { muiTheme } from './util/muiTheme';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
