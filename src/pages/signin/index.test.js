import React from 'react';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';

import Signin from './index.js';

const App = () => (
  <>
    <Routes>
      <Route exact path="/signin" element={<Signin />} />
    </Routes>
  </>
);

test('load and render component', () => {
  const history = createMemoryHistory();
  history.push('/signin');

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  expect(screen.getAllByText('Sign in')).toBeDefined();
  expect(screen.getAllByText('Nice to see you again!')).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();

  const forgotPasswordLink = screen.getAllByText(/Forgot password\?/i)[0];
  expect(forgotPasswordLink).toBeInTheDocument();
});

test('render and submit form', async () => {
  const formParams = {
    locale: 'en',
    email: 'luihbautista@gmail.com',
    password: '12345'
  };
  const errorResponse = {
    response: {
      status: 404,
      data: {}
    }
  };

  const history = createMemoryHistory();
  history.push('/signin');

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  axios.get.mockResolvedValueOnce(() => Promise.resolve({ data: {} }));

  const emailInput = screen.getAllByTestId('email-input')[0];
  const passwordInput = screen.getAllByTestId('password-input')[0];

  expect(emailInput).not.toBeNull();
  expect(passwordInput).not.toBeNull();

  fireEvent.change(emailInput, { target: { value: formParams.email } });
  fireEvent.change(passwordInput, { target: { value: formParams.password } });

  const submitButton = screen.getAllByText('Submit')[0];
  await waitFor(() => {
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(axios.get).toHaveBeenCalledWith('users/signin', { params: formParams });
});

test('render and submit form fails', async () => {
  const formParams = {
    locale: 'en',
    email: 'luihbautista@gmail.com',
    password: '12345'
  };
  const errorResponse = {
    response: {
      status: 404,
      statusText: 'Not found',
      data: {}
    }
  };

  const history = createMemoryHistory();
  history.push('/signin');

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  axios.get.mockRejectedValueOnce(errorResponse);

  const emailInput = screen.getAllByTestId('email-input')[0];
  const passwordInput = screen.getAllByTestId('password-input')[0];

  expect(emailInput).not.toBeNull();
  expect(passwordInput).not.toBeNull();

  fireEvent.change(emailInput, { target: { value: formParams.email } });
  fireEvent.change(passwordInput, { target: { value: formParams.password } });

  const submitButton = screen.getAllByText('Submit')[0];
  await waitFor(() => {
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(axios.get).toHaveBeenCalledWith('users/signin', { params: formParams });
  expect(screen.getAllByText('HTTP error: Not found')).toBeDefined();
});
