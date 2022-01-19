import React from 'react';
import { render, screen } from '@testing-library/react';

import CustomAnchorLink from './index.js';

const testProps = {
  id: 'home',
  title: 'Homepage',
  to: '/home',
  active: true,
  className: 'CustomLink-class'
};

test('load and render active component', () => {
  const { container } = render(<CustomAnchorLink {...testProps} />);

  const link = screen.getByRole('link');

  expect(link).toBeInTheDocument();
  expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
  expect(container.querySelector('.CustomLink-class')).not.toBeNull();
  expect(container.querySelector('.MuiButton-outlined')).not.toBeNull();
});

test('load and render inactive component', () => {
  const combinedProps = { ...testProps, active: false };
  const { container } = render(<CustomAnchorLink {...combinedProps} />);

  const link = screen.getByRole('link');

  expect(link).toBeInTheDocument();
  expect(screen.getByText(/Homepage/i)).toBeInTheDocument();
  expect(container.querySelector('.CustomLink-class')).not.toBeNull();
  expect(container.querySelector('.MuiButton-outlined')).toBeNull();
});
