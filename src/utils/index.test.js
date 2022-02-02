import * as Utils from './index';

test('fieldElementProps with errors', () => {
  const expectedProps = {
    name: 'fieldName',
    label: 'Fieldname',
    color: 'error',
    inputProps: { 'data-testid': 'field-name-input' },
    FormHelperTextProps: { style: { color: '#d32f2f', fontWeight: '400' } },
    helperText: 'error',
    focused: true
  };

  const props = Utils.fieldElementProps(
    'fieldName',
    { fieldName: 'error' },
    { fieldName: 'Fieldname' }
  );

  expect(JSON.stringify(props)).toEqual(JSON.stringify(expectedProps));
});

const history = jest.fn();
const responseHTTP = { email: 'lmiguelbautista@gmail.com', api_token: 'abc123' };
const expectedSession = { email: responseHTTP.email, token: responseHTTP.api_token };

import routes from '../routes';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

beforeEach(() => jest.clearAllMocks());

test('getSessionCookies', () => {
  Utils.setSessionCookies(responseHTTP, history);
  const session = Utils.getSessionCookies();

  expect(JSON.stringify(session)).toEqual(JSON.stringify(expectedSession));
});

test('removeSessionCookies', () => {
  Utils.setSessionCookies(responseHTTP, history);
  let session = Utils.getSessionCookies();

  expect(JSON.stringify(session)).toEqual(JSON.stringify(expectedSession));

  Utils.removeSessionCookies(history);
  session = Utils.getSessionCookies();

  expect(history).toHaveBeenCalledWith(routes.home);
  expect(JSON.stringify(session)).toEqual(JSON.stringify({}));
});

test('hasSession returns true', () => {
  Utils.removeSessionCookies(history);
  Utils.setSessionCookies(responseHTTP, history);
  expect(Utils.hasSession()).toBeTruthy();
});

test('hasSession returns false', () => {
  Utils.removeSessionCookies(history);
  expect(Utils.hasSession()).toBeFalsy();
});

test('setSessionCookies', () => {
  Cookies.set = jest.fn();
  jest.spyOn(CryptoJS.AES, 'encrypt').mockImplementation(() => {
    return 'encryptedValue';
  });

  Utils.setSessionCookies(responseHTTP, history);

  expect(history).toHaveBeenCalledWith(routes.signupConfirmation);
  expect(Cookies.set).toHaveBeenCalledWith('user', 'encryptedValue', { expires: 1 / 48 });
  expect(Cookies.set).toHaveBeenCalledWith('token', 'encryptedValue', { expires: 1 / 48 });
});
