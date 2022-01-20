import React from 'react';
import { render, screen } from '@testing-library/react';
import ResetPassword from './index.js';

test('load and render component', () => {
  render(<ResetPassword />);

  expect(screen.getAllByText('Reset password')).toBeDefined();
  expect(screen.getAllByText('Problems to access?')).toBeDefined();
  expect(screen.getAllByText("We'll send you an email to restore your credentials")).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});
