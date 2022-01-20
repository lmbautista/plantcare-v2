import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';

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
