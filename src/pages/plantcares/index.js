import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import theGardenImg from './images/the-garden.png';
import theWateringImg from './images/the-watering.png';
import theConnectivityImg from './images/the-connectivity.png';
import plantcaresNotFoundImg from './images/plantcares-not-found.png';
import wateringsNotFoundImg from './images/waterings-not-found.png';
import connectionsNotFoundImg from './images/connections-not-found.png';
import InstructionsStepOneImg from './images/instructions-step-one.png';
import InstructionsStepTwoImg from './images/instructions-step-two.png';
import InstructionsStepThreeImg from './images/instructions-step-three.png';
import InstructionsStepFourImg from './images/instructions-step-four.png';
import CardExplainedImg from './images/plantcare-explained.png';
// UI components
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// Components
import Bubble from './bubble';
import Card from './card';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import PanelWithImage from '../../components/panel-with-image';
import Panel from '../../components/panel';
// Bubble
import defaultImg from './images/plantcare-default.png';
import wateringImg from './images/watering-icon.png';
import connectivityImg from './images/connectivity-icon.png';
import { ReactComponent as EditImg } from './images/edit-icon.svg';
import { ReactComponent as RemoveImg } from './images/remove-icon.svg';
// Others
import enLocale from './locales/en.js';
import Statics from './statics';
import { loadingFragment, authHeader } from '../../utils';

const httClient = axios.create({
  baseURL: 'http://dev.api.yourplantcare.com/v1',
  timeout: 5000
});

const HEADER_HEIGHT = 64;

export const Plantcares = ({ }) => {
  const currentAuthHeader = authHeader();
  // HTTP component
  const [loading, setLoading] = useState(true);
  const [plantcares, setPlantcares] = useState([]);
  const [waterings, setWaterings] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getPlantcares = (responseHandler, errorHandler) => {
    if (currentAuthHeader === null) {
      return false;
    }

    httClient
      .get('plantcares', {
        locale: 'en',
        headers: { ...currentAuthHeader }
      })
      .then(function (response) {
        responseHandler(response.data);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const { message: responseMessage } = error.response.data;
          errorHandler(responseMessage);
        } else {
          const responseMessage = (error.response && error.response.statusText) || error.message;
          errorHandler(`HTTP error: ${responseMessage}`);
        }
      })
      .finally(function () {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPlantcares(setPlantcares, setErrorMessage);
  }, [JSON.stringify(currentAuthHeader)]);

  useEffect(() => {
    setWaterings(
      plantcares.reduce((result, plantcare) => {
        result[plantcare.name] = plantcare.waterings;
        return result;
      }, {})
    );
  }, [plantcares]);

  // HTLM component
  const renderNotFoundSection = (image, text) => (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      m="40px auto"
      maxWidth="lg"
    >
      <Grid item>
        <img src={image} style={{ maxHeight: '20vh', minHeight: '1vmin' }} />
      </Grid>
      <Grid item direction="column" sx={styles.notFound.text}>
        <Typography
          fontFamily={'Pacifico'}
          color="secondary"
          variant="h4"
          mb="18px"
          textAlign="center"
          sx={{ display: { xs: 'flex', lg: 'none' } }}
        >
          {text}
        </Typography>
        <Typography
          fontFamily={'Pacifico'}
          color="secondary"
          variant="h2"
          mb="18px"
          textAlign="center"
          sx={{ display: { xs: 'none', lg: 'flex' } }}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );

  const { styles, props, typographies } = useMemo(() => Statics(), []);

  const gardenButtons = (
    <Stack direction="row" spacing={2} pt={6}>
      <Button component={Link} to="#" variant="outlined" color="primary" size="large">
        {enLocale.theGarden.new}
      </Button>
      <AnchorLink style={{ textDecoration: 'none' }} offset={HEADER_HEIGHT} href="#howto">
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
          image={theGardenImg}
          styles={{ imgStyles: { maxHeight: '28vh' }, minHeight: '1vmin' }}
          title={enLocale.theGarden.title}
          subtitle={enLocale.theGarden.subtitle}
          description={enLocale.theGarden.description}
          children={gardenButtons}
        />
      </Grid>
      <Grid container direction="row" justifyContent="center" xs={12} mt={4}>
        {loading && loadingFragment()}
        {!loading &&
          plantcares.length > 0 &&
          plantcares.map((plantcare) => <Card key={`${plantcare.name}`} plantcare={plantcare} />)}
        {!loading &&
          plantcares.length === 0 &&
          renderNotFoundSection(plantcaresNotFoundImg, enLocale.theGarden.plantcaresNotFound)}
      </Grid>
    </Grid>
  );

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
          <img src={InstructionsStepOneImg} alt="instructions-step-one" height={'100%'} />
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
          {typographies.howSetup.stepOne.title}
          {typographies.howSetup.stepOne.explanaition}
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
          <img src={InstructionsStepTwoImg} alt="instructions-step-two" height={'100%'} />
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
          {typographies.howSetup.stepTwo.title}
          {typographies.howSetup.stepTwo.explanaition}
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
          <img src={InstructionsStepThreeImg} alt="instructions-step-three" height={'100%'} />
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
          {typographies.howSetup.stepThree.title}
          {typographies.howSetup.stepThree.explanaition}
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
          <img src={InstructionsStepFourImg} alt="instructions-step-four" height={'100%'} />
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
          {typographies.howSetup.stepFour.title}
          {typographies.howSetup.stepFour.explanaition}
        </Grid>
      </Grid>
    </>
  );

  const howItWorks = (
    <>
      <Grid item xs={12} md={6} lg={5} display="flex" justifyContent="center" alignItems="center">
        <img
          src={CardExplainedImg}
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

  const wateringButtons = (
    <Stack direction="row" spacing={2} pt={6}>
      <Button component={Link} to="#" variant="outlined" color="primary" size="large">
        {enLocale.theWatering.new}
      </Button>
    </Stack>
  );

  const wateringBubbleProps = (title, programmedAt) => ({
    key: `${title}-${programmedAt}`,
    title,
    subtitle: (
      <>
        Next watering at <br />
        {programmedAt}
      </>
    ),
    actions: (
      <>
        <Button {...props.actionButton}>
          <EditImg width="45px" height="45px" />
        </Button>
        <Button {...props.actionButton}>
          <RemoveImg width="45px" height="45px" />
        </Button>
      </>
    ),
    icon: wateringImg,
    background: defaultImg
  });

  const watering = (
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
          image={theWateringImg}
          styles={{ imgStyles: { maxHeight: '28vh' }, minHeight: '1vmin' }}
          title={enLocale.theWatering.title}
          subtitle={enLocale.theWatering.subtitle}
          description={enLocale.theWatering.description}
          children={wateringButtons}
        />
      </Grid>
      <Grid container direction="row" justifyContent="center" xs={12} mt={4}>
        {loading && loadingFragment()}
        {!loading &&
          Object.entries(waterings).map(([plantcareName, plantcareWaterings]) => {
            return plantcareWaterings.map((watering) => (
              <Bubble {...wateringBubbleProps(plantcareName, watering.programmed_at)} />
            ));
          })}
        {Object.keys(waterings).length === 0 &&
          renderNotFoundSection(wateringsNotFoundImg, enLocale.theWatering.wateringsNotFound)}
      </Grid>
    </Grid>
  );

  const connectivityBubbleProp = () => {
    const idx = Math.floor(Math.random() * 3) + 1;

    return {
      title: `Board ${idx}`,
      subtitle: (
        <>
          Last connection at <br />
          {plantcares.length > 0 && plantcares[idx].lastConnectionAt}
        </>
      ),
      actions: (
        <>
          <Button {...props.actionButton}>
            <EditImg width="45px" height="45px" />
          </Button>
          <Button {...props.actionButton}>
            <RemoveImg width="45px" height="45px" />
          </Button>
        </>
      ),
      icon: connectivityImg,
      background: defaultImg
    };
  };

  const connectivity = (
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
          image={theConnectivityImg}
          styles={{ imgStyles: { maxHeight: '28vh' }, minHeight: '1vmin' }}
          title={enLocale.theConnectivity.title}
          subtitle={enLocale.theConnectivity.subtitle}
          description={enLocale.theConnectivity.description}
        />
      </Grid>
      <Grid container direction="row" justifyContent="center" xs={12} mt={4}>
        {/* <Bubble {...connectivityBubbleProp()} /> */}
        {loading && loadingFragment()}
        {!loading &&
          renderNotFoundSection(
            connectionsNotFoundImg,
            enLocale.theConnectivity.connectionsNotFound
          )}
      </Grid>
    </Grid>
  );

  return (
    <span data-testid="plantcares">
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
          {errorMessage}
        </Alert>
      )}
      <div id="garden" style={{ ...styles.default, ...styles.gardenStyles }} data-testid="garden">
        <Box sx={{ mt: { xs: 5, sm: 8 }, padding: '50px 0', width: '100%' }}>{garden}</Box>
      </div>
      <div id="watering" style={styles.wateringStyles} data-testid="watering">
        <Box sx={{ padding: '50px 0', width: '100%' }}>{watering}</Box>
      </div>
      <div id="connectivity" style={styles.connectivityStyles} data-testid="connectivity">
        <Box sx={{ padding: '50px 0', width: '100%' }}>{connectivity}</Box>
      </div>
      <div id="howto" style={styles.howToStyles} data-testid="howto">
        <Box sx={{ padding: '50px 0', width: '100%' }}>{howTo}</Box>
      </div>
    </span>
  );
};

export default Plantcares;
