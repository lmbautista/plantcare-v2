import { Link } from 'react-router-dom';
import gardenImg from './images/garden.png';
// UI components
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// Components
import Card from './card';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import PanelWithImage from '../../components/panel-with-image';
import Panel from '../../components/panel';
import InstructionsStepOne from './images/instructions-step-one.png';
import InstructionsStepTwo from './images/instructions-step-two.png';
import InstructionsStepThree from './images/instructions-step-three.png';
import InstructionsStepFour from './images/instructions-step-four.png';
import CardExplained from './images/plantcare-explained.png';
// Others
import enLocale from './locales/en.js';
import Main from '../../themes/main';

const styles = {
  default: {
    minHeight: '95vmin',
    display: 'flex',
    alignItems: 'center'
  },
  theInstructions: {
    howSetup: {
      img: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'end' },
        maxHeight: { xs: '50vmin', sm: '22vmin' },
        paddingRight: { xs: '0', sm: '30px' },
        marginBottom: { xs: '30px' }
      }
    },
    howItworks: {
      img: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '60vh',
        margin: 'auto'
      },
      avatar: {
        background: '#F4F4F4',
        color: Main.palette.secondary.main,
        border: `1px solid ${Main.palette.secondary.main}`
      }
    }
  }
};

const gardenStyles = { background: '#F6F3F3' };
const howToStyles = { background: '#DADFDF' };
const connectivityStyles = { background: '#F6F3F3' };

export const Plantcares = ({}) => {
  const headerHeight = '64';
  const gardenButtons = (
    <Stack direction="row" spacing={2} pt={6}>
      <Button component={Link} to="#" variant="outlined" color="primary" size="large">
        {enLocale.theGarden.new}
      </Button>
      <AnchorLink style={{ textDecoration: 'none' }} offset={headerHeight} href="#howto">
        <Button variant="outlined" color="primary" size="large" underline="none">
          {enLocale.theGarden.howTo}
        </Button>
      </AnchorLink>
    </Stack>
  );

  const garden = (
    <Grid
      container
      sx={{ margin: 'auto' }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      maxWidth="xl"
    >
      <Grid item direction="column" justifyContent="center" xs={12}>
        <PanelWithImage
          image={gardenImg}
          styles={{ imgStyles: { maxHeight: '35vh' }, minHeight: '1vmin' }}
          title={enLocale.theGarden.title}
          subtitle={enLocale.theGarden.subtitle}
          description={enLocale.theGarden.description}
          children={gardenButtons}
        />
      </Grid>
      <Grid container direction="row" justifyContent="center" xs={12}>
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>
    </Grid>
  );

  const typographies = {
    howItWorks: {
      explanaitionOne: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.one.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.one.description}
          </Typography>
        </>
      ),
      explanaitionTwo: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.two.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.two.description}
          </Typography>
        </>
      ),
      explanaitionThree: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.three.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.three.description}
          </Typography>
        </>
      ),
      explanaitionFour: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.four.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.four.description}
          </Typography>
        </>
      ),
      explanaitionFive: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.five.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.five.description}
          </Typography>
        </>
      ),
      explanaitionSix: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.six.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.six.description}
          </Typography>
        </>
      ),
      explanaitionSeven: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.seven.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.seven.description}
          </Typography>
        </>
      )
    }
  };
  const howSetup = (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        m="0 auto 40px auto"
        maxWidth="lg"
      >
        <Grid item xs={12} sm={4} sx={styles.theInstructions.howSetup.img}>
          <img src={InstructionsStepOne} alt="instructions-step-one" height={'100%'} />
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="center"
          display="flex"
          xs={12}
          sm={6}
          md={6}
          sx={{ padding: '0 10px' }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {enLocale.theInstructions.howSetup.stepOne.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            {enLocale.theInstructions.howSetup.stepOne.descriptionOne}(
            <a
              href="https://github.com/lmbautista"
              style={{
                color: `${Main.palette.primary.main}`,
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
              target="_blank"
            >
              {enLocale.theInstructions.howSetup.stepOne.githubUser}
            </a>
            ).
            <br />
            {enLocale.theInstructions.howSetup.stepOne.descriptionTwo}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        m="0 auto 40px auto"
        maxWidth="lg"
      >
        <Grid item xs={12} sm={4} sx={styles.theInstructions.howSetup.img}>
          <img src={InstructionsStepTwo} alt="instructions-step-two" height={'100%'} />
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="center"
          display="flex"
          xs={12}
          sm={6}
          md={6}
          sx={{ padding: '0 10px' }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {enLocale.theInstructions.howSetup.stepTwo.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            {enLocale.theInstructions.howSetup.stepTwo.descriptionOne}
            <AnchorLink
              style={{ textDecoration: 'none', color: `${Main.palette.primary.main}` }}
              offset={headerHeight}
              href="#garden"
            >
              <b>{enLocale.theInstructions.howSetup.stepTwo.descriptionTwo}</b>
            </AnchorLink>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        m="0 auto 40px auto"
        maxWidth="lg"
      >
        <Grid item xs={12} sm={4} sx={styles.theInstructions.howSetup.img}>
          <img src={InstructionsStepThree} alt="instructions-step-three" height={'100%'} />
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="center"
          display="flex"
          xs={12}
          sm={6}
          md={6}
          sx={{ padding: '0 10px' }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {enLocale.theInstructions.howSetup.stepThree.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            {enLocale.theInstructions.howSetup.stepThree.descriptionOne}
          </Typography>
          <ul style={{ margin: '0', padding: '0 0 0 15px' }}>
            <li>
              <Typography variant="h6" sx={{ fontWeight: 'light' }}>
                {enLocale.theInstructions.howSetup.stepThree.descriptionTwo}
              </Typography>
            </li>
            <li>
              <Typography variant="h6" sx={{ fontWeight: 'light' }}>
                {enLocale.theInstructions.howSetup.stepThree.descriptionThree}
              </Typography>
            </li>
            <li>
              <Typography variant="h6" sx={{ fontWeight: 'light' }}>
                {enLocale.theInstructions.howSetup.stepThree.descriptionFour}
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        m="0 auto 40px auto"
        maxWidth="lg"
      >
        <Grid item xs={12} sm={4} sx={styles.theInstructions.howSetup.img}>
          <img src={InstructionsStepFour} alt="instructions-step-four" height={'100%'} />
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="center"
          display="flex"
          xs={12}
          sm={6}
          md={6}
          sx={{ padding: '0 10px' }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {enLocale.theInstructions.howSetup.stepFour.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            {enLocale.theInstructions.howSetup.stepFour.description}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
  const howItWorks = (
    <>
      <Grid item xs={12} md={6} lg={5} display="flex" justifyContent="center" alignItems="center">
        <img
          src={CardExplained}
          alt="card-explained"
          style={styles.theInstructions.howItworks.img}
        />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        xs={12}
        sm={10}
        md={4}
        lg={5}
        pt={{ xs: '20px', md: '0' }}
      >
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={styles.theInstructions.howItworks.avatar}>1</Avatar>
            </ListItemAvatar>
            <ListItemText primary={typographies.howItWorks.explanaitionOne} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={styles.theInstructions.howItworks.avatar}>2</Avatar>
            </ListItemAvatar>
            <ListItemText primary={typographies.howItWorks.explanaitionTwo} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={styles.theInstructions.howItworks.avatar}>3</Avatar>
            </ListItemAvatar>
            <ListItemText primary={typographies.howItWorks.explanaitionThree} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={styles.theInstructions.howItworks.avatar}>4</Avatar>
            </ListItemAvatar>
            <ListItemText primary={typographies.howItWorks.explanaitionFour} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={styles.theInstructions.howItworks.avatar}>5</Avatar>
            </ListItemAvatar>
            <ListItemText primary={typographies.howItWorks.explanaitionFive} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={styles.theInstructions.howItworks.avatar}>6</Avatar>
            </ListItemAvatar>
            <ListItemText primary={typographies.howItWorks.explanaitionSix} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar style={styles.theInstructions.howItworks.avatar}>7</Avatar>
            </ListItemAvatar>
            <ListItemText primary={typographies.howItWorks.explanaitionSeven} />
          </ListItem>
        </List>
      </Grid>
    </>
  );

  const howTo = (
    <Box
      sx={{ margin: 'auto' }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      maxWidth="xl"
    >
      <Panel
        styles={{ padding: '64px 0 96px' }}
        title={enLocale.theInstructions.howSetup.title}
        subtitle={enLocale.theInstructions.howSetup.subtitle}
        description={enLocale.theInstructions.howSetup.description}
      />
      {howSetup}
      <Panel
        styles={{ padding: '64px 0 96px' }}
        title={enLocale.theInstructions.howItworks.title}
        subtitle={enLocale.theInstructions.howItworks.subtitle}
        description={enLocale.theInstructions.howItworks.description}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        m="0 auto 40px auto"
        maxWidth="lg"
      >
        {howItWorks}
      </Grid>
    </Box>
  );

  const connectivity = <h1>Connectivity</h1>;

  return (
    <span data-testid="plantcares">
      <div id="garden" style={{ ...styles.default, ...gardenStyles }}>
        <Box sx={{ mt: { xs: 5, sm: 8 }, padding: '30px 0', width: '100%' }}>{garden}</Box>
      </div>
      <div id="howto" style={howToStyles}>
        <Box sx={{ padding: '30px 0', width: '100%' }}>{howTo}</Box>
      </div>
      <div id="connectivity" style={connectivityStyles}>
        <Box sx={{ padding: '30px 0', width: '100%' }}>{connectivity}</Box>
      </div>
    </span>
  );
};

export default Plantcares;
