import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'light',
    primary: { main: '#107a79' },
    secondary: { main: '#441d38' },
    ternary: { main: '#fed8a3' },
    light: { main: '#fff' },
    warning: { main: '#ff9800' }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
};

const Main = createTheme(themeOptions);
export default Main;
