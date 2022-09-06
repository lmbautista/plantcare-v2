import { useMemo, useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
// Images
import theGardenImg from './images/the-garden.png';
import plantcaresNotFoundImg from './images/plantcares-not-found.png';
// UI components
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
// Components
import Form from './plantcare-form';
import PlantcareCard from './card';
// Others
import enLocale from './locales/en.js';
import enFormLocale from './plantcare-form/locales/en.js';
import Statics from './statics';
import { loadingFragment, authHeader } from '../../utils';
import * as PlantcaresApiClient from '../../api-client/plantcares';
import { notFoundFragment, sectionHeaderFragment } from '.';
import Main from '../../themes/main';

const HEADER_HEIGHT = 64;

export const TheGarden = ({}) => {
  const currentAuthHeader = authHeader();
  const { styles, props } = useMemo(() => Statics(), []);
  // HTTP component
  const [loading, setLoading] = useState(false);
  const [plantcares, setPlantcares] = useState([]);
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

  const buttons = (
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

  return (
    <ThemeProvider theme={Main}>
      <Grid
        container
        sx={{ margin: 'auto' }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        maxWidth="xl"
      >
        {sectionHeaderFragment({ section: 'theGarden', image: theGardenImg, buttons })}
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
    </ThemeProvider>
  );
};

export default TheGarden;
