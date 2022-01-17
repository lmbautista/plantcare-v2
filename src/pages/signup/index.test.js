import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from './index.js';

test('load and render component', () => {
  render(<Signup />);

  expect(screen.getAllByText('Sign up')).toBeDefined();
  expect(screen.getAllByText("Let's join the team!")).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});
