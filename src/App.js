import homeImg from './images/home/home.png';
import enLocale from './locales/en.js';
// UI components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from './Header';
import { ThemeProvider } from '@mui/material/styles';
import Main from './themes/main';

import './App.scss';

const homePages = [];
const styles = {
  home: {
    content: {
      mobile: [
        { display: { xs: 'flex', lg: 'none' } },
        { textAlign: { xs: 'center', md: 'left' } },
        { alignItems: { xs: 'center', md: 'flex-start' } },
        { padding: '20px 10px 0 10px' }
      ],
      desktop: [{ display: { xs: 'none', lg: 'flex' } }, { minHeight: '93vmin' }]
    }
  }
};

function App() {
  return (
    <ThemeProvider theme={Main}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={10}>
          <Header pages={homePages} />
        </Grid>
        <Grid
          item
          className="App-home"
          direction="column"
          justifyContent="center"
          xs={12}
          md={4}
          lg={5}
          sx={styles.home.content.desktop}
        >
          <Typography fontFamily={'Pacifico'} color="secondary" variant="h1">
            {enLocale.home.title}
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            {enLocale.home.subtitle}
          </Typography>
          <Typography variant="h5" pt="30px" sx={{ fontWeight: 'light' }}>
            {enLocale.home.description}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          lg={5}
          direction="column"
          justifyContent="center"
          textAlign={'center'}
          className="App-home"
          sx={styles.home.content.mobile}
        >
          <Typography fontFamily={'Pacifico'} color="secondary" variant="h2">
            {enLocale.home.title}
          </Typography>
          <Typography color="secondary" variant="h3" sx={{ fontWeight: 'bold' }}>
            {enLocale.home.subtitle}
          </Typography>
          <Typography variant="h6" pt="30px" sx={{ fontWeight: 'light' }}>
            {enLocale.home.description}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          pl="20px"
          pt="20px"
        >
          <img src={homeImg} alt="home-image" width={'90%'} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
