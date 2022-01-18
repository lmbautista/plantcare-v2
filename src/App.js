import Home from './pages/home';
import Header from './components/header';
import Main from './themes/main';

import { ThemeProvider } from '@mui/material/styles';

import './App.scss';

const homePages = ['Features', 'About', 'Contact', 'Sign up', 'Sign in'];
function App() {
  return (
    <>
      <ThemeProvider theme={Main}>
        <Header pages={homePages} />
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
