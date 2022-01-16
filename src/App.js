import homeImg from './images/home/home.png';
import featureOneImg from './images/home/feature-one.png';
import featureTwoImg from './images/home/feature-two.png';
import featureThreeImg from './images/home/feature-three.png';
import circuitImg from './images/home/circuit.png';
import enLocale from './locales/en.js';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from './Header';
import { ThemeProvider } from '@mui/material/styles';
import Main from './themes/main';

import './App.scss';

const homePages = ['Features'];
const styles = {
  home: {
    content: {
      main: {
        backgroundImage: `url(${circuitImg})`,
        backgroundBlendMode: 'color',
        backgroundSize: 'cover',
        mixBlendMode: 'darken'
      },
      mobile: [
        { display: { xs: 'flex', lg: 'none' } },
        { textAlign: { xs: 'center', md: 'left' } },
        { alignItems: { xs: 'center', md: 'flex-start' } },
        { padding: '20px 10px 0 10px' }
      ],
      desktop: [{ display: { xs: 'none', lg: 'flex' } }, { minHeight: '93vmin' }]
    },
    features: {
      main: {
        backgroundColor: 'ternary.main',
        padding: '60px 10px'
      },
      img: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'end' },
        maxHeight: { xs: '50vmin', sm: '22vmin' },
        paddingRight: { xs: '0', sm: '30px' },
        marginBottom: { xs: '30px' }
      }
    }
  }
};

const home = (
  <Grid container direction="row" justifyContent="center" alignItems="stretch">
    <Grid
      item
      direction="column"
      justifyContent="center"
      xs={12}
      md={4}
      lg={5}
      sx={styles.home.content.desktop.concat(styles.home.content.main)}
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
      sx={styles.home.content.mobile.concat(styles.home.content.main)}
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
    <Grid item xs={12} md={6} lg={5} display="flex" justifyContent="center" alignItems="center">
      <img src={homeImg} alt="home-image" width={'90%'} />
    </Grid>
  </Grid>
);

const features = (
  <Box sx={styles.home.features.main}>
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Grid item xs={12} md={10} pb="40px">
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h3">
          {enLocale.features.title}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={4} lg={3} sx={styles.home.features.img}>
        <img src={featureOneImg} alt="feature-one-image" height={'100%'} />
      </Grid>
      <Grid item direction="column" justifyContent="center" display="flex" xs={12} sm={4}>
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.features.featureOne.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.features.featureOne.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={4} lg={3} sx={styles.home.features.img}>
        <img src={featureTwoImg} alt="feature-two-image" height={'100%'} />
      </Grid>
      <Grid item direction="column" justifyContent="center" display="flex" xs={12} sm={4}>
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.features.featureTwo.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.features.featureTwo.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={4} lg={3} sx={styles.home.features.img}>
        <img src={featureThreeImg} alt="feature-three-image" height={'100%'} />
      </Grid>
      <Grid item direction="column" justifyContent="center" display="flex" xs={12} sm={4}>
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.features.featureThree.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.features.featureThree.description}
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={Main}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={10}>
          <Header pages={homePages} />
        </Grid>
      </Grid>
      {home}
      {features}
    </ThemeProvider>
  );
}

export default App;
