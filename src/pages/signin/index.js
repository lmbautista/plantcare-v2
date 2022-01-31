import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import signinImg from './images/signin.png';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
// Components
import PanelWithImage from '../../components/panel-with-image';
// Others
import enLocale from './locales/en.js';
import Main from '../../themes/main';
import routes from '../../routes';
import { fieldElementProps } from '../../utils';

import { FormContainer, TextFieldElement, PasswordElement } from 'react-hook-form-mui';

const httClient = axios.create({
  baseURL: 'http://dev.api.yourplantcare.com/v1',
  timeout: 1000
});

export const Signin = ({}) => {
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errors, setErrors] = useState({});
  const formLocales = enLocale.form;
  const submit = (data) => {
    const { email, password } = data;
    const params = { email, password, locale: 'en' };

    httClient
      .get('users/signin', { params })
      .then(function () {
        history(routes.signupConfirmation);
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          const { message: responseMessage, errors: responseErrors } = error.response.data;
          setErrorMessage(responseMessage);
          setErrors(responseErrors);
        } else {
          const responseMessage = error.response.statusText;
          setErrorMessage(`HTTP error: ${responseMessage}`);
        }
      });
  };

  const form = (
    <Grid container direction="row" justifyContent="center" alignItems="stretch" pt="40px">
      <Grid item direction="column" justifyContent="center" xs={12} md={10}>
        <Box
          pb="60px"
          sx={{
            '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' }
          }}
        >
          <FormContainer
            onSuccess={(data) => submit(data)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                {errorMessage}
              </Alert>
            )}

            <TextFieldElement {...fieldElementProps('email', errors, formLocales)} required />
            <PasswordElement {...fieldElementProps('password', errors, formLocales)} required />

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
  const forgotPassword = (
    <Box pb="60px">
      <Link
        style={{
          color: `${Main.palette.primary.main}`,
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
        to={routes.resetPassword}
      >
        {enLocale.forgotPassword}
      </Link>
    </Box>
  );

  return (
    <ThemeProvider theme={Main}>
      <Box sx={{ mt: { xs: 5, sm: 8 } }}>
        <PanelWithImage
          image={signinImg}
          title={enLocale.title}
          subtitle={enLocale.subtitle}
          styles={{ textAlign: 'center' }}
        >
          {form}
          {forgotPassword}
        </PanelWithImage>
      </Box>
    </ThemeProvider>
  );
};

export default Signin;
