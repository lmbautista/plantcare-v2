import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import formImg from './images/form.png';
// UI components
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
// Components
import PanelWithImage from '../../../components/panel-with-image';
// Others
import enLocale from './locales/en.js';
import Main from '../../../themes/main';
import { fieldElementProps, authHeader } from '../../../utils';
import { UserContext } from '../../../UserContext';

import {
  FormContainer,
  TextFieldElement,
  DatePickerElement,
  SelectElement
} from 'react-hook-form-mui';

const httClient = axios.create({
  baseURL: 'http://dev.api.yourplantcare.com/v1',
  timeout: 5000
});

const wetSensorOptions = [
  { title: `${enLocale.wetSensor} 1`, id: 'A0' },
  { title: `${enLocale.wetSensor} 2`, id: 'A1' },
  { title: `${enLocale.wetSensor} 3`, id: 'A2' },
  { title: `${enLocale.wetSensor} 4`, id: 'A3' },
  { title: `${enLocale.wetSensor} 5`, id: 'A4' },
  { title: `${enLocale.wetSensor} 6`, id: 'A5' }
];

const waterPumpOptions = [
  { title: `${enLocale.waterPump} 1`, id: 'IN1' },
  { title: `${enLocale.waterPump} 2`, id: 'IN2' },
  { title: `${enLocale.waterPump} 3`, id: 'IN3' },
  { title: `${enLocale.waterPump} 4`, id: 'IN4' }
];

export const PlantcareForm = ({ plantcare }) => {
  const currentAuthHeader = authHeader();
  const [isVisibleSuccessMessage, setVisibleSuccessMessage] = useState(false);
  const [isVisibleErrorMessage, setVisibleErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errors, setErrors] = useState({});
  const formLocales = enLocale.form;
  const action = Object.keys(plantcare).length > 0 ? 'edit' : 'new';
  const title = enLocale[action].title;
  const subtitle = enLocale[action].subtitle;

  const submitHandler = (formData) => {
    if (currentAuthHeader === null) {
      return false;
    }

    const data = {
      id: plantcare.id,
      name: formData.name,
      wet_sensor_field: formData.wetSensorField,
      water_pump_field: formData.waterPumpField
    };
    const method = plantcare.id ? 'PUT' : 'POST';
    const url = plantcare.id ? `plantcares/${plantcare.id}` : 'plantcares';
    const headers = { locale: 'en', ...currentAuthHeader };

    httClient
      .request({ method, url, data, headers })
      .then(function () {
        setVisibleSuccessMessage(true);
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const { message: responseMessage, errors: responseErrors } = error.response.data;
          setErrorMessage(responseMessage);
          setErrors(responseErrors);
        } else {
          const responseMessage = (error.response && error.response.statusText) || error.message;
          setErrorMessage(`HTTP error: ${responseMessage}`);
        }
        setVisibleErrorMessage(true);
      });
  };

  const successMessagePanel = (
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
        <AlertTitle>{enLocale[action].success.title}</AlertTitle>
        {enLocale[action].success.description}
      </Alert>
    </Collapse>
  );

  const errorMessagePanel = errorMessage && (
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
        <AlertTitle>{enLocale.somethingWentWrong}</AlertTitle>
        {errorMessage}
      </Alert>
    </Collapse>
  );

  const form = (
    <Grid container direction="row" justifyContent="center" alignItems="stretch" pt="40px">
      <Grid item direction="column" justifyContent="center" xs={12} md={10}>
        {successMessagePanel}
        {errorMessagePanel}
      </Grid>
      <Grid item direction="column" justifyContent="center" xs={12} md={10}>
        <Box
          pb="60px"
          sx={{
            '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%', textAlign: 'left' }
          }}
        >
          <FormContainer
            defaultValues={{
              name: plantcare.name,
              wetSensorField: plantcare.wet_sensor_field,
              waterPumpField: plantcare.water_pump_field
            }}
            onSuccess={(data) => submitHandler(data)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <TextFieldElement
              {...fieldElementProps({ name: 'name', errors, locales: formLocales })}
              required
            />
            <SelectElement
              {...fieldElementProps({
                name: 'wetSensorField',
                errors,
                locales: formLocales,
                options: wetSensorOptions
              })}
              required
            />
            <SelectElement
              {...fieldElementProps({
                name: 'waterPumpField',
                errors,
                locales: formLocales,
                options: waterPumpOptions
              })}
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              sx={{ fontWeight: 'medium' }}
            >
              {enLocale.form.submit}
            </Button>
          </FormContainer>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <ThemeProvider theme={Main}>
      <Box data-testid="plantcare-form" sx={{ mt: { xs: 5, sm: 8 }, padding: '30px' }}>
        <PanelWithImage
          image={formImg}
          title={title}
          subtitle={subtitle}
          styles={{ textAlign: 'center' }}
        >
          {form}
        </PanelWithImage>
      </Box>
    </ThemeProvider>
  );
};

export default PlantcareForm;

PlantcareForm.propTypes = {
  plantcare: PropTypes.object
};

PlantcareForm.defaultProps = {
  plantcare: {}
};
