import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupConfirmation from './index.js';

test('load and render component', () => {
  render(<SignupConfirmation />);

  expect(screen.getAllByText('Welcome!')).toBeDefined();
  expect(screen.getAllByText('Account created sucessfully')).toBeDefined();
  expect(screen.getAllByText("We'll send you an email to confirm your account")).toBeDefined();
});
