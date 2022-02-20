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
