import homeImg from './images/home.png';
import circuitImg from './images/circuit.png';
import featureOneImg from './images/feature-one.png';
import featureTwoImg from './images/feature-two.png';
import featureThreeImg from './images/feature-three.png';
import authorImg from './images/author.png';
import contactImg from './images/contact.png';
import logoImg from '../../images/logo.png';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Components
import Signup from '../../pages/signup';
import Signin from '../../pages/signin';
import PanelWithImage from '../../components/panel-with-image';
// Others
import enLocale from './locales/en.js';
import Main from '../../themes/main';

const styles = {
  home: {
    content: {
      main: {
        backgroundImage: `url(${circuitImg})`,
        backgroundBlendMode: 'color',
        backgroundSize: 'cover',
        mixBlendMode: 'darken'
      },
      mobile: {
        display: { xs: 'flex', lg: 'none' },
        textAlign: { xs: 'center', md: 'left' },
        alignItems: { xs: 'center', md: 'flex-start' },
        padding: '20px 10px 0 10px'
      },
      desktop: { display: { xs: 'none', lg: 'flex' }, minHeight: '93vmin' }
    },
    features: {
      main: {
        backgroundColor: 'ternary.main',
        padding: '30px 10px'
      },
      img: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'end' },
        maxHeight: { xs: '50vmin', sm: '22vmin' },
        paddingRight: { xs: '0', sm: '30px' },
        marginBottom: { xs: '30px' }
      }
    },
    about: {
      main: {
        backgroundColor: '#f6f3f3',
        padding: '30px 10px'
      },
      img: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'end' },
        maxHeight: { xs: '50vmin', sm: '22vmin' },
        paddingRight: { xs: '0', sm: '30px' },
        marginBottom: { xs: '30px' }
      }
    },
    contact: {
      main: {
        backgroundColor: `${Main.palette.primary.main}`,
        padding: '30px 10px'
      }
    }
  }
};

const home = (
  <PanelWithImage
    id="home"
    image={homeImg}
    title={enLocale.home.title}
    subtitle={enLocale.home.subtitle}
    description={enLocale.home.description}
    styles={styles.home.content.main}
  />
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
      <Grid item xs={12} sm={3} md={2} sx={styles.home.features.img}>
        <img src={featureOneImg} alt="feature-one-image" height={'100%'} />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        display="flex"
        xs={12}
        sm={6}
        md={5}
        lg={4}
      >
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.features.featureOne.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.features.featureOne.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={3} md={2} sx={styles.home.features.img}>
        <img src={featureTwoImg} alt="feature-two-image" height={'100%'} />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        display="flex"
        xs={12}
        sm={6}
        md={5}
        lg={4}
      >
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.features.featureTwo.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.features.featureTwo.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={3} md={2} sx={styles.home.features.img}>
        <img src={featureThreeImg} alt="feature-three-image" height={'100%'} />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        display="flex"
        xs={12}
        sm={6}
        md={5}
        lg={4}
      >
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

const about = (
  <Box sx={styles.home.about.main}>
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Grid item xs={12} md={10} pb="40px">
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h3">
          {enLocale.about.title}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={3} sx={styles.home.about.img}>
        <img src={authorImg} alt="author-image" height={'100%'} />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        display="flex"
        xs={12}
        sm={6}
        md={5}
        lg={4}
      >
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.about.author.title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'light' }}>
          {enLocale.about.author.subtitle}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'medium' }}>
          {enLocale.about.author.githubUser}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.about.author.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={3} sx={styles.home.about.img}>
        <img src={logoImg} alt="logo-about-image" height={'100%'} />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        display="flex"
        xs={12}
        sm={6}
        md={5}
        lg={4}
      >
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.about.demo.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.about.demo.description}
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

const contact = (
  <Box sx={styles.home.contact.main}>
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Grid item xs={12} md={10} pb="40px">
        <Typography fontFamily={'Pacifico'} color="white" variant="h3">
          {enLocale.contact.title}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Grid item direction="column" justifyContent="center" xs={10} md={3}>
        <Box
          component="form"
          pb="60px"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%', color: 'white' },
            '& .MuiInputBase-input': { color: 'white' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="fullname"
            label={`${enLocale.contact.form.fullName}`}
            color="light"
            focused
          />
          <TextField
            required
            id="email"
            label={`${enLocale.contact.form.email}`}
            color="light"
            focused
          />
          <TextField
            required
            id="message"
            label={`${enLocale.contact.form.message}`}
            color="light"
            focused
            multiline
            rows={6}
          />
          <Button
            href="#"
            key="contact-form-submit"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ fontWeight: 'medium' }}
          >
            {enLocale.contact.form.submit}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={5} display="flex" justifyContent="center" alignItems="center">
        <img src={contactImg} alt="contact-image" width={'90%'} />
      </Grid>
    </Grid>
  </Box>
);

export const Home = ({}) => {
  return (
    <span data-testid="homepage">
      <Box sx={{ mt: { xs: 5, sm: 8 } }}>
        <span id="home">{home}</span>
        <span id="features">{features}</span>
        <span id="about">{about}</span>
        <span id="contact">{contact}</span>
        <span id="signup">
          <Signup />
        </span>
        <span id="signin">
          <Signin />
        </span>
      </Box>
    </span>
  );
};

export default Home;
