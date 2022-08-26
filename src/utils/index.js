// Context
import { useContext } from 'react';
import { UserContext } from '../UserContext';

import Main from '../themes/main';
import { Grid } from '@mui/material';
import LoadingImg from '../images/loading.gif';

export const fieldElementProps = ({
  name: fieldName,
  errors,
  locales,
  options = null,
  type = null
}) => {
  const helperErrorText = errors && errors[fieldName];
  const fieldNameId = fieldName
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();

  const defaultOptions = {
    name: fieldName,
    label: locales[fieldName],
    color: helperErrorText ? 'error' : 'secondary',
    inputProps: { 'data-testid': `${fieldNameId}-input` },
    FormHelperTextProps: { style: { color: `${Main.palette.error.main}`, fontWeight: '400' } },
    helperText: helperErrorText,
    focused: true
  };
  const typeOption = type ? { type } : {};
  const selectOptions = options ? { options } : {};

  return { ...defaultOptions, ...typeOption, ...selectOptions };
};

import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export const USER = 'user';
export const TOKEN = 'token';
const pass = 'my-secret-pass'; // TODO: move to env var
const sessionExpiredIn30minutes = 1 / 48;

const encrypt = (value) => (value === undefined ? undefined : CryptoJS.AES.encrypt(value, pass));
const decrypt = (value) =>
  value === undefined ? undefined : CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(value, pass));

export const setSessionCookies = (userData) => {
  const { email: user, api_token: apiToken } = userData;

  Cookies.set(USER, encrypt(user), { expires: sessionExpiredIn30minutes });
  Cookies.set(TOKEN, encrypt(apiToken), { expires: sessionExpiredIn30minutes });
};

export const getSessionCookies = () => {
  const sessionCookie = {
    user: decrypt(Cookies.get(USER)),
    token: decrypt(Cookies.get(TOKEN))
  };

  return JSON.stringify(sessionCookie) === JSON.stringify({}) ? {} : sessionCookie;
};

export const removeSessionCookies = () => {
  Cookies.remove(USER);
  Cookies.remove(TOKEN);
};

export const loadingFragment = () => (
  <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="stretch"
    m="40px auto"
    maxWidth="lg"
  >
    <Grid item>
      <img
        src={LoadingImg}
        width="75px"
        height="75px"
        style={{ borderRadius: '50%', background: 'white' }}
      />
    </Grid>
  </Grid>
);

export const authHeader = () => {
  const { currentUser } = useContext(UserContext);
  const userToken = currentUser?.profile().token;

  if (userToken == undefined) {
    return null;
  } else {
    return { Authorization: `Token ${userToken}` };
  }
};
