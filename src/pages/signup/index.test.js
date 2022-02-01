import React from 'react';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';

import Signup from './index.js';

const App = () => (
  <>
    <Routes>
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
  </>
);

test('load and render component', () => {
  const history = createMemoryHistory();
  history.push('/signup');

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  expect(screen.getAllByText('Sign up')).toBeDefined();
  expect(screen.getAllByText("Let's join the team!")).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});

test('render and submit form', async () => {
  const formParams = {
    email: 'luihbautista@gmail.com',
    first_name: 'Luih',
    last_name: 'Bautista',
    locale: 'en',
    password: '12345',
    password_confirmation: '12345'
  };

  const history = createMemoryHistory();
  history.push('/signup');

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  axios.post.mockResolvedValueOnce(() => Promise.resolve({ response: { data: {} } }));

  const firstNameInput = screen.getAllByTestId('first-name-input')[0];
  const lastNameInput = screen.getAllByTestId('last-name-input')[0];
  const emailInput = screen.getAllByTestId('email-input')[0];
  const passwordInput = screen.getAllByTestId('password-input')[0];
  const passwordConfirmationInput = screen.getAllByTestId('password-confirmation-input')[0];

  expect(firstNameInput).not.toBeNull();
  expect(lastNameInput).not.toBeNull();
  expect(emailInput).not.toBeNull();
  expect(passwordInput).not.toBeNull();
  expect(passwordConfirmationInput).not.toBeNull();

  fireEvent.change(firstNameInput, { target: { value: formParams.first_name } });
  fireEvent.change(lastNameInput, { target: { value: formParams.last_name } });
  fireEvent.change(emailInput, { target: { value: formParams.email } });
  fireEvent.change(passwordInput, { target: { value: formParams.password } });
  fireEvent.change(passwordConfirmationInput, {
    target: { value: formParams.password_confirmation }
  });

  const submitButton = screen.getAllByText('Submit')[0];
  await waitFor(() => {
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(axios.post).toHaveBeenCalledWith('users', formParams);
});

test('render and submit form fails with 422', async () => {
  const formParams = {
    email: 'luihbautista@gmail.com',
    first_name: 'Luih',
    last_name: 'Bautista',
    locale: 'en',
    password: '12345',
    password_confirmation: '54321'
  };
  const errorResponse = {
    response: {
      status: 422,
      data: {
        message: 'Invalid params to create user',
        statusText: 'Unprocessable entity',
        code: 'validation',
        errors: { password: ['Does not fit with confirmation'] }
      }
    }
  };

  const history = createMemoryHistory();
  history.push('/signup');

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  axios.post.mockRejectedValueOnce(errorResponse);

  const firstNameInput = screen.getAllByTestId('first-name-input')[0];
  const lastNameInput = screen.getAllByTestId('last-name-input')[0];
  const emailInput = screen.getAllByTestId('email-input')[0];
  const passwordInput = screen.getAllByTestId('password-input')[0];
  const passwordConfirmationInput = screen.getAllByTestId('password-confirmation-input')[0];

  expect(firstNameInput).not.toBeNull();
  expect(lastNameInput).not.toBeNull();
  expect(emailInput).not.toBeNull();
  expect(passwordInput).not.toBeNull();
  expect(passwordConfirmationInput).not.toBeNull();

  fireEvent.change(firstNameInput, { target: { value: formParams.first_name } });
  fireEvent.change(lastNameInput, { target: { value: formParams.last_name } });
  fireEvent.change(emailInput, { target: { value: formParams.email } });
  fireEvent.change(passwordInput, { target: { value: formParams.password } });
  fireEvent.change(passwordConfirmationInput, {
    target: { value: formParams.password_confirmation }
  });

  const submitButton = screen.getAllByText('Submit')[0];
  await waitFor(() => {
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(axios.post).toHaveBeenCalledWith('users', formParams);
  expect(screen.getAllByText(errorResponse.response.data.message)).toBeDefined();
  expect(screen.getAllByText(errorResponse.response.data.errors.password)).toBeDefined();
});

test('render and submit form fails with non 404 error', async () => {
  const formParams = {
    email: 'luihbautista@gmail.com',
    first_name: 'Luih',
    last_name: 'Bautista',
    locale: 'en',
    password: '12345',
    password_confirmation: '54321'
  };
  const errorResponse = {
    response: {
      status: 500,
      statusText: 'Internal Server Error',
      data: {}
    }
  };

  const history = createMemoryHistory();
  history.push('/signup');

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  axios.post.mockRejectedValueOnce(errorResponse);

  const firstNameInput = screen.getAllByTestId('first-name-input')[0];
  const lastNameInput = screen.getAllByTestId('last-name-input')[0];
  const emailInput = screen.getAllByTestId('email-input')[0];
  const passwordInput = screen.getAllByTestId('password-input')[0];
  const passwordConfirmationInput = screen.getAllByTestId('password-confirmation-input')[0];

  expect(firstNameInput).not.toBeNull();
  expect(lastNameInput).not.toBeNull();
  expect(emailInput).not.toBeNull();
  expect(passwordInput).not.toBeNull();
  expect(passwordConfirmationInput).not.toBeNull();

  fireEvent.change(firstNameInput, { target: { value: formParams.first_name } });
  fireEvent.change(lastNameInput, { target: { value: formParams.last_name } });
  fireEvent.change(emailInput, { target: { value: formParams.email } });
  fireEvent.change(passwordInput, { target: { value: formParams.password } });
  fireEvent.change(passwordConfirmationInput, {
    target: { value: formParams.password_confirmation }
  });

  const submitButton = screen.getAllByText('Submit')[0];
  await waitFor(() => {
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(axios.post).toHaveBeenCalledWith('users', formParams);
  expect(screen.getAllByText('HTTP error: Internal Server Error')).toBeDefined();
});
