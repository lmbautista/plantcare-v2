import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// UI components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { FormContainer, TextFieldElement, SelectElement } from 'react-hook-form-mui';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
// Others
import enLocale from './locales/en.js';
import Main from '../../../themes/main';
import { fieldElementProps, authHeader, loadingFragment } from '../../../utils';
import * as PlantcaresApiClient from '../../../api-client/plantcares';

const durationUnitOptions = [
  { label: enLocale.duration.seconds, id: enLocale.duration.seconds },
  { label: enLocale.duration.minutes, id: enLocale.duration.minutes },
  { label: enLocale.duration.hours, id: enLocale.duration.hours }
];

export const WateringForm = ({ watering, errors, onSubmitHandler }) => {
  const formLocales = enLocale.form;
  const action = Object.keys(watering).length > 0 ? 'edit' : 'new';
  const title = enLocale[action].title;
  const subtitle = enLocale[action].subtitle;

  const currentAuthHeader = authHeader();
  const [plantcaresLoading, setPlantcaresLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isVisibleErrorMessage, setVisibleErrorMessage] = useState(false);
  const [plantcares, setPlantcares] = useState([]);

  const getPlantcares = () => {
    if (currentAuthHeader === null) {
      return false;
    }

    const onSuccessHandler = setPlantcares;
    const onErrorHandler = ({ responseMessage }) => setErrorMessage(responseMessage);
    const onFinishHandler = () => setPlantcaresLoading(false);
    const headers = { ...currentAuthHeader };

    setPlantcaresLoading(true);
    PlantcaresApiClient.getPlantcares({
      headers,
      onSuccessHandler,
      onErrorHandler,
      onFinishHandler
    });
  };

  useEffect(() => {
    getPlantcares();
  }, [JSON.stringify(currentAuthHeader)]);

  return (
    <ThemeProvider theme={Main}>
      <Grid
        data-testid="watering-form"
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        pt="40px"
        sx={{
          '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%', textAlign: 'left' }
        }}
      >
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h3" mb="18px">
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          {subtitle}
        </Typography>
        <FormContainer
          defaultValues={{
            durationAmount: watering.durationAmount ?? undefined,
            durationUnit: watering.durationUnit ?? undefined,
            waterPumpId: watering.waterPumpId ?? undefined,
            programmedAt: watering.programmedAt ?? undefined
          }}
          onSuccess={(data) => onSubmitHandler({ ...data, id: watering.id })}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Grid container direction="row" justifyContent="center">
            <Grid item xs={4}>
              <TextFieldElement
                {...fieldElementProps({
                  name: 'durationAmount',
                  errors,
                  locales: formLocales
                })}
                required
              />
            </Grid>
            <Grid item xs={8}>
              <SelectElement
                {...fieldElementProps({
                  name: 'durationUnit',
                  errors,
                  locales: formLocales,
                  options: durationUnitOptions
                })}
              />
            </Grid>
          </Grid>
          <TextFieldElement
            {...fieldElementProps({
              name: 'programmedAt',
              type: 'datetime-local',
              errors,
              locales: formLocales
            })}
            required
          />
          {plantcaresLoading ? (
            loadingFragment('small')
          ) : (
            <SelectElement
              {...fieldElementProps({
                name: 'waterPumpId',
                errors,
                locales: formLocales,
                options: plantcares.map((plantcare) => ({
                  label: plantcare.name,
                  id: plantcare.water_pump_id
                }))
              })}
            />
          )}
          <Stack direction="row" spacing={2} pt={6}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              sx={{ fontWeight: 'medium' }}
            >
              {enLocale.form.submit}
            </Button>
          </Stack>
        </FormContainer>
      </Grid>
    </ThemeProvider>
  );
};

export default WateringForm;

WateringForm.propTypes = {
  watering: PropTypes.object,
  errors: PropTypes.object,
  onSubmitHandler: PropTypes.func
};

WateringForm.defaultProps = {
  watering: {},
  errors: {}
};
