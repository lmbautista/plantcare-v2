import React from 'react';
import { render, screen } from '@testing-library/react';
import Signin from './index.js';

test('load and render component', () => {
  render(<Signin />);

  expect(screen.getAllByText('Sign in')).toBeDefined();
  expect(screen.getAllByText('Nice to see you again!')).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});
