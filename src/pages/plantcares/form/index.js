import PropTypes from 'prop-types';
// UI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
// Others
import enLocale from './locales/en.js';
import Main from '../../../themes/main';
import { fieldElementProps } from '../../../utils';

import { FormContainer, TextFieldElement, SelectElement } from 'react-hook-form-mui';

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

export const PlantcareForm = ({ plantcare, errors, onSubmitHandler }) => {
  const formLocales = enLocale.form;
  const action = Object.keys(plantcare).length > 0 ? 'edit' : 'new';
  const title = enLocale[action].title;
  const subtitle = enLocale[action].subtitle;

  const form = (
    <>
      <Grid item direction="column" justifyContent="center" xs={10}>
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
            onSuccess={(data) => onSubmitHandler({ ...data, id: plantcare.id })}
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
        </Box>
      </Grid>
    </>
  );

  return (
    <ThemeProvider theme={Main}>
      <Box data-testid="plantcare-form">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" pt="40px">
          <Grid item direction="column" justifyContent="center" xs={10}>
            <Typography fontFamily={'Pacifico'} color="secondary" variant="h3" mb="18px">
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
              {subtitle}
            </Typography>
          </Grid>
          {form}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default PlantcareForm;

PlantcareForm.propTypes = {
  plantcare: PropTypes.object,
  errors: PropTypes.object,
  onSubmitHandler: PropTypes.func
};

PlantcareForm.defaultProps = {
  plantcare: {},
  errors: {}
};
