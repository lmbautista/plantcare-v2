import React from 'react';
import * as Utils from './index';
import { render, screen } from '@testing-library/react';
import User from '../components/user';

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

  const props = Utils.fieldElementProps({
    name: 'fieldName',
    errors: { fieldName: [{ error: 'error' }] },
    locales: { fieldName: 'Fieldname' }
  });

  expect(JSON.stringify(props)).toEqual(JSON.stringify(expectedProps));
});

test('fieldElementProps with errors in Id field', () => {
  const expectedProps = {
    name: 'fieldNameId',
    label: 'Fieldname',
    color: 'error',
    inputProps: { 'data-testid': 'field-name-id-input' },
    FormHelperTextProps: { style: { color: '#d32f2f', fontWeight: '400' } },
    helperText: 'error',
    focused: true
  };

  const props = Utils.fieldElementProps({
    name: 'fieldNameId',
    errors: { fieldName: [{ error: 'error' }] },
    locales: { fieldNameId: 'Fieldname' }
  });

  expect(JSON.stringify(props)).toEqual(JSON.stringify(expectedProps));
});

test('fieldElementProps with options', () => {
  const expectedProps = {
    name: 'fieldName',
    label: 'Fieldname',
    color: 'error',
    inputProps: { 'data-testid': 'field-name-input' },
    FormHelperTextProps: { style: { color: '#d32f2f', fontWeight: '400' } },
    helperText: 'error',
    focused: true,
    options: [{ a: 1, b: 2 }]
  };

  const props = Utils.fieldElementProps({
    name: 'fieldName',
    errors: { fieldName: [{ error: 'error' }] },
    locales: { fieldName: 'Fieldname' },
    options: [{ a: 1, b: 2 }]
  });

  expect(JSON.stringify(props)).toEqual(JSON.stringify(expectedProps));
});

test('fieldElementProps with type', () => {
  const expectedProps = {
    name: 'fieldName',
    label: 'Fieldname',
    color: 'error',
    inputProps: { 'data-testid': 'field-name-input' },
    FormHelperTextProps: { style: { color: '#d32f2f', fontWeight: '400' } },
    helperText: 'error',
    focused: true,
    type: 'hidden'
  };

  const props = Utils.fieldElementProps({
    name: 'fieldName',
    errors: { fieldName: [{ error: 'error' }] },
    locales: { fieldName: 'Fieldname' },
    type: 'hidden'
  });

  expect(JSON.stringify(props)).toEqual(JSON.stringify(expectedProps));
});

const history = jest.fn();
const responseHTTP = { email: 'lmiguelbautista@gmail.com', api_token: 'abc123' };
const expectedSession = { user: responseHTTP.email, token: responseHTTP.api_token };

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

  expect(JSON.stringify(session)).toEqual(JSON.stringify({}));
});

test('setSessionCookies', () => {
  Cookies.set = jest.fn();
  jest.spyOn(CryptoJS.AES, 'encrypt').mockImplementation(() => {
    return 'encryptedValue';
  });

  Utils.setSessionCookies(responseHTTP, history);

  expect(Cookies.set).toHaveBeenCalledWith('user', 'encryptedValue', { expires: 1 / 48 });
  expect(Cookies.set).toHaveBeenCalledWith('token', 'encryptedValue', { expires: 1 / 48 });
});

test('loadingFragment', () => {
  render(Utils.loadingFragment());

  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('authHeader', () => {
  const cookieData = { user: 'luihbautista@gmail.com', token: 'abc123' };
  Utils.getSessionCookies = jest.fn().mockImplementation(() => cookieData);

  const user = User({ history });
  jest.spyOn(React, 'useContext').mockImplementation(() => ({ currentUser: user }));

  expect(Utils.authHeader()).toEqual({ Authorization: 'Token abc123' });
});

test('authHeader without user session', () => {
  const cookieData = {};
  Utils.getSessionCookies = jest.fn().mockImplementation(() => cookieData);

  const user = User({ history });
  jest.spyOn(React, 'useContext').mockImplementation(() => ({ currentUser: user }));

  expect(Utils.authHeader()).toBeNull();
});
