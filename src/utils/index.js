import Main from '../themes/main';

export const fieldElementProps = (fieldName, errors, locales, options = null) => {
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
  const selectOptions = options ? { options } : {};

  return { ...defaultOptions, ...selectOptions };
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

export const mockPlantcare = () => {
  const wetStatuses = [
    Math.min(Math.floor(Math.random() * 100) + 60, 100),
    Math.floor(Math.random() * 60) + 35,
    Math.floor(Math.random() * 35)
  ];
  const names = ['Ficus retusa', 'Lemon cypress', 'Olive tree', 'Elm zelkova'];
  const mockIdx = Math.floor(Math.random() * 3);

  return {
    name: names[mockIdx],
    wet: wetStatuses[mockIdx],
    planted_at: '03/03/2022',
    watered_at: '03/03/2022 15:35',
    waterings: [{ programmed_at: '03/03/2022 21:22' }],
    wet_synced_at: '03/03/2022 16:45',
    last_connection_at: '03/03/2022 16:45'
  };
};
