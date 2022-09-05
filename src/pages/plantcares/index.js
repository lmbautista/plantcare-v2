import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
// Components
import Bubble from './bubble';
import PlantcareCard from './card';
import Form from './form';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Panel from '../../components/panel';
// Bubble
import defaultImg from './images/plantcare-default.png';
import wateringImg from './images/watering-icon.png';
import connectivityImg from './images/connectivity-icon.png';
import { ReactComponent as EditImg } from './images/edit-icon.svg';
import { ReactComponent as RemoveImg } from './images/remove-icon.svg';
// Others
import enLocale from './locales/en.js';
import enFormLocale from './form/locales/en.js';
import Statics from './statics';
import { loadingFragment, authHeader } from '../../utils';
import * as PlantcaresApiClient from '../../api-client/plantcares';
import Main from '../../themes/main';
const HEADER_HEIGHT = 64;

export const Plantcares = ({}) => {
  const currentAuthHeader = authHeader();
  const { styles, props, typographies } = useMemo(() => Statics(), []);
  // HTTP component
  const [loading, setLoading] = useState(false);
  const [plantcares, setPlantcares] = useState([]);
  const [waterings, setWaterings] = useState({});
  const [isVisibleErrorMessage, setVisibleErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errors, setErrors] = useState(undefined);
  const [isVisibleSuccessMessage, setVisibleSuccessMessage] = useState(false);
  const [successMessageTitle, setSuccessMessageTitle] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [creationVisibility, setCreationVisibility] = useState(false);
  const [editionVisibility, setEditionVisibility] = useState({});

  const toggleCreation = () => setCreationVisibility((value) => !value);
  const toggleEdition = (plantcareId) => {
    const visibility =
      (editionVisibility[plantcareId] !== undefined && !editionVisibility[plantcareId]) ?? false;

    setEditionVisibility((value) => ({ ...value, [plantcareId]: visibility }));
  };

  const savePlantcares = (plantcares) => {
    setPlantcares(
      plantcares.reduce((result, plantcare) => {
        result[plantcare.id] = plantcare;
        return result;
      }, {})
    );
  };

  const refreshPlantcare = (plantcare) => {
    setPlantcares((value) => {
      value[plantcare.id] = { ...value[plantcare.id], ...plantcare };
      return value;
    });
  };

  const removePlantcare = (plantcare) => {
    setPlantcares((value) => {
      delete value[plantcare.id];
      return value;
    });
  };

  const getPlantcares = () => {
    if (currentAuthHeader === null) {
      return false;
    }

    const onSuccessHandler = savePlantcares;
    const onErrorHandler = ({ responseMessage }) => setErrorMessage(responseMessage);
    const onFinishHandler = () => setLoading(false);
    const headers = { ...currentAuthHeader };

    setLoading(true);
    PlantcaresApiClient.getPlantcares({
      headers,
      onSuccessHandler,
      onErrorHandler,
      onFinishHandler
    });
  };

  const createPlantcare = (data) => {
    if (currentAuthHeader === null) {
      return false;
    }

    const onSuccessHandler = () => {
      setSuccessMessageTitle(enFormLocale.new.success.title);
      setSuccessMessage(enFormLocale.new.success.description);
      getPlantcares();
      setVisibleSuccessMessage(true);
    };
    const onErrorHandler = ({ responseMessage, responseErrors }) => {
      setErrorMessage(responseMessage);
      setErrors(responseErrors);
      setVisibleErrorMessage(true);
    };
    const onFinishHandler = () => {
      toggleCreation();
      setLoading(false);
    };
    const headers = { ...currentAuthHeader };

    setLoading(true);
    PlantcaresApiClient.createPlantcare({
      data,
      headers,
      onSuccessHandler,
      onErrorHandler,
      onFinishHandler
    });
  };

  const updatePlantcare = (data) => {
    if (currentAuthHeader === null) {
      return false;
    }

    const onSuccessHandler = (plantcare) => {
      setSuccessMessageTitle(enFormLocale.edit.success.title);
      setSuccessMessage(enFormLocale.edit.success.description);
      refreshPlantcare(plantcare);
      setVisibleSuccessMessage(true);
    };
    const onErrorHandler = ({ responseMessage, responseErrors }) => {
      setErrorMessage(responseMessage);
      setErrors(responseErrors);
      setVisibleErrorMessage(true);
    };
    const onFinishHandler = () => {
      toggleEdition(data.id);
      setLoading(false);
    };
    const headers = { ...currentAuthHeader };

    setLoading(true);
    PlantcaresApiClient.updatePlantcare({
      data,
      headers,
      onSuccessHandler,
      onErrorHandler,
      onFinishHandler
    });
  };

  const getPlantcare = (id) => {
    if (currentAuthHeader === null) {
      return false;
    }
    const onSuccessHandler = refreshPlantcare;
    const onErrorHandler = ({ responseMessage }) => setErrorMessage(responseMessage);
    const onFinishHandler = () => {
      toggleEdition(id);
      setLoading(false);
    };
    const headers = { ...currentAuthHeader };

    setLoading(true);
    PlantcaresApiClient.getPlantcare({
      id,
      headers,
      onSuccessHandler,
      onErrorHandler,
      onFinishHandler
    });
  };

  const deletePlantcare = (plantcare) => {
    if (currentAuthHeader === null) {
      return false;
    }

    const onSuccessHandler = () => {
      setSuccessMessageTitle(enLocale.theGarden.remove.success.title);
      setSuccessMessage(enLocale.theGarden.remove.success.description);
      setVisibleSuccessMessage(true);
      removePlantcare(plantcare);
    };
    const onErrorHandler = ({ responseMessage }) => {
      setErrorMessage(responseMessage);
      setVisibleErrorMessage(true);
    };
    const onFinishHandler = () => {
      setLoading(false);
    };
    const headers = { ...currentAuthHeader };

    setLoading(true);
    PlantcaresApiClient.deletePlantcare({
      id: plantcare.id,
      headers,
      onSuccessHandler,
      onErrorHandler,
      onFinishHandler
    });
  };

  useEffect(() => {
    getPlantcares();
  }, [JSON.stringify(currentAuthHeader)]);

  useEffect(() => {
    setWaterings(
      Object.values(plantcares).reduce((result, plantcare) => {
        result[plantcare.name] = plantcare.waterings;
        return result;
      }, {})
    );
    Object.values(plantcares).map((plantcare) =>
      setEditionVisibility((value) => ({ ...value, [plantcare.id]: false }))
    );
  }, [JSON.stringify(plantcares)]);

  const notFoundFragment = (image, text) => (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      m="40px auto"
      maxWidth="lg"
    >
      <Grid item>
        <img src={image} style={{ maxHeight: '6vh', minHeight: '1vmin' }} />
      </Grid>
      <Grid item direction="column" sx={styles.notFound.text}>
        <Typography
          fontFamily={'Pacifico'}
          color="secondary"
          variant="h5"
          mb="18px"
          textAlign="center"
          sx={{ display: { xs: 'flex', lg: 'none' } }}
        >
          {text}
        </Typography>
        <Typography
          fontFamily={'Pacifico'}
          color="secondary"
          variant="h4"
          mb="18px"
          textAlign="center"
          sx={{ display: { xs: 'none', lg: 'flex' } }}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );

  const sectionHeaderFragment = (section, image, buttons = <></>) => (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      m="0 auto 40px auto"
      maxWidth="lg"
    >
      <Grid item xs={12} sm={4} sx={styles.sectionHeader.imgContainer}>
        <img src={image} alt={`${section}-img`} style={styles.sectionHeader.img} />
      </Grid>
      <Grid item xs={12} sm={6} md={6} sx={styles.sectionHeader.details}>
        {typographies[section].title}
        {typographies[section].subtitle}
        {typographies[section].description}
        {buttons}
      </Grid>
    </Grid>
  );

  const formCardFragment = ({ plantcare, onCloseHandler, onSubmitHandler }) => (
    <Card sx={styles.card}>
      <Box data-testid="form" sx={{ position: 'relative' }}>
        <Box sx={styles.cardForm}>
          <Button
            {...props.actionButton}
            data-testid="close-form"
            onClick={() => {
              onCloseHandler();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </Button>
        </Box>
        <Form plantcare={plantcare} onSubmitHandler={onSubmitHandler} errors={errors} />
      </Box>
    </Card>
  );

  const successMessageFragment = (
    <Collapse in={isVisibleSuccessMessage}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setVisibleSuccessMessage(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>{successMessageTitle}</AlertTitle>
        {successMessage}
      </Alert>
    </Collapse>
  );

  const errorMessageFragment = errorMessage && (
    <Collapse in={isVisibleErrorMessage}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setVisibleErrorMessage(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>{enFormLocale.somethingWentWrong}</AlertTitle>
        {errorMessage}
      </Alert>
    </Collapse>
  );

  const gardenButtons = (
    <Stack
      direction="row"
      spacing={2}
      pt={6}
      sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
    >
      <Button
        onClick={() => toggleCreation()}
        to="#"
        variant="outlined"
        color="primary"
        size="large"
        data-testid="new-plantcare-button"
      >
        {enLocale.theGarden.new}
      </Button>
      <AnchorLink style={{ textDecoration: 'none' }} offset={HEADER_HEIGHT} href="#howto">
        <Button variant="outlined" color="primary" size="large" underline="none">
          {enLocale.theGarden.howTo}
        </Button>
      </AnchorLink>
    </Stack>
  );

  const gardenFragment = (
    <Grid
      container
      sx={{ margin: 'auto' }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      maxWidth="xl"
    >
      {sectionHeaderFragment('theGarden', theGardenImg, gardenButtons)}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        maxWidth="md"
        sx={{ margin: { xs: '0 10px', sm: 'auto' } }}
      >
        <Grid item xs={12}>
          {errorMessageFragment}
          {successMessageFragment}
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="space-evenly">
        {loading && loadingFragment()}
        {creationVisibility &&
          formCardFragment({
            onCloseHandler: toggleCreation,
            onSubmitHandler: createPlantcare
          })}
        {!loading &&
          Object.values(plantcares).length > 0 &&
          Object.values(plantcares).map((plantcare) => (
            <>
              {!editionVisibility[plantcare.id] && (
                <PlantcareCard
                  key={`card-${plantcare.name}`}
                  plantcare={plantcare}
                  onEditHandler={() => toggleEdition(plantcare.id)}
                  onRemoveHandler={() => deletePlantcare(plantcare)}
                />
              )}
              {editionVisibility[plantcare.id] &&
                formCardFragment({
                  plantcare,
                  onCloseHandler: () => toggleEdition(plantcare.id),
                  onSubmitHandler: updatePlantcare
                })}
            </>
          ))}
        {!loading &&
          Object.entries(plantcares).length === 0 &&
          notFoundFragment(plantcaresNotFoundImg, enLocale.theGarden.plantcaresNotFound)}
      </Grid>
    </Grid>
  );

  const howSetupFragment = (
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

  const howItWorksFragment = (
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

  const howToFragment = (
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
      {howSetupFragment}
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
        {howItWorksFragment}
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

  const wateringFragment = (
    <Grid
      container
      sx={{ margin: 'auto' }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      maxWidth="xl"
    >
      {sectionHeaderFragment('theWatering', theWateringImg, wateringButtons)}
      <Grid container direction="row" justifyContent="center" xs={12} mt={4}>
        {loading && loadingFragment()}
        {!loading &&
          Object.entries(waterings).map(([plantcareName, plantcareWaterings]) => {
            return plantcareWaterings.map((watering) => (
              <Bubble {...wateringBubbleProps(plantcareName, watering.programmed_at)} />
            ));
          })}
        {Object.keys(waterings).length === 0 &&
          notFoundFragment(wateringsNotFoundImg, enLocale.theWatering.wateringsNotFound)}
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
          {Object.values(plantcares).length > 0 && Object.values(plantcares)[idx].lastConnectionAt}
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

  const connectivityFragment = (
    <Grid
      container
      sx={{ margin: 'auto' }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      maxWidth="xl"
    >
      {sectionHeaderFragment('theConnectivity', theConnectivityImg)}
      <Grid container direction="row" justifyContent="center" xs={12} mt={4}>
        {/* <Bubble {...connectivityBubbleProp()} /> */}
        {loading && loadingFragment()}
        {!loading &&
          notFoundFragment(connectionsNotFoundImg, enLocale.theConnectivity.connectionsNotFound)}
      </Grid>
    </Grid>
  );

  return (
    <ThemeProvider theme={Main}>
      <span data-testid="plantcares">
        <div id="garden" style={{ ...styles.default, ...styles.gardenStyles }} data-testid="garden">
          <Box sx={{ mt: { xs: 5, sm: 8 }, padding: '50px 0', width: '100%' }}>
            {gardenFragment}
          </Box>
        </div>
        <div id="watering" style={styles.wateringStyles} data-testid="watering">
          <Box sx={{ padding: '50px 0', width: '100%' }}>{wateringFragment}</Box>
        </div>
        <div id="connectivity" style={styles.connectivityStyles} data-testid="connectivity">
          <Box sx={{ padding: '50px 0', width: '100%' }}>{connectivityFragment}</Box>
        </div>
        <div id="howto" style={styles.howToStyles} data-testid="howto">
          <Box sx={{ padding: '50px 0', width: '100%' }}>{howToFragment}</Box>
        </div>
      </span>
    </ThemeProvider>
  );
};

export default Plantcares;
