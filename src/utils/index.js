import Main from '../themes/main';

export const fieldElementProps = (fieldName, errors, locales) => {
  const helperErrorText = errors && errors[fieldName];
  const fieldNameId = fieldName
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();

  return {
    name: fieldName,
    label: locales[fieldName],
    color: helperErrorText ? 'error' : 'secondary',
    inputProps: { 'data-testid': `${fieldNameId}-input` },
    FormHelperTextProps: { style: { color: `${Main.palette.error.main}`, fontWeight: '400' } },
    helperText: helperErrorText,
    focused: true
  };
};

import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import routes from '../routes';

const pass = 'my-secret-pass'; // TODO: move to env var
const sessionExpiredIn30minutes = 1 / 48;

const encrypt = (value) => (value === undefined ? undefined : CryptoJS.AES.encrypt(value, pass));
const decrypt = (value) =>
  value === undefined ? undefined : CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(value, pass));

export const setSessionCookies = (session, history) => {
  const { email, api_token: apiToken } = session;

  Cookies.set('user', encrypt(email), { expires: sessionExpiredIn30minutes });
  Cookies.set('token', encrypt(apiToken), { expires: sessionExpiredIn30minutes });

  history(routes.signupConfirmation);
};

export const getSessionCookies = () => {
  const sessionCookie = {
    email: decrypt(Cookies.get('user')),
    token: decrypt(Cookies.get('token'))
  };

  return JSON.stringify(sessionCookie) === JSON.stringify({}) ? {} : sessionCookie;
};

export const removeSessionCookies = (history) => {
  Cookies.remove('user');
  Cookies.remove('token');
  history(routes.home);
};

export const hasSession = () => JSON.stringify(getSessionCookies()) !== JSON.stringify({});
