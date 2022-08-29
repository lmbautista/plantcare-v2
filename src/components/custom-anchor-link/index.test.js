import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CustomAnchorLink from './index.js';

const onClickHandler = jest.fn();
const testProps = {
  id: 'home',
  title: 'Homepage',
  to: '/home',
  active: true,
  className: 'CustomLink-class',
  onClickHandler
};

beforeEach(() => jest.clearAllMocks());

test('load and render active component', () => {
  window.scroll = jest.fn();
  const { container } = render(
    <>
      <CustomAnchorLink {...testProps} />
      <span id="home"></span>
    </>
  );

  expect(container.querySelector('.CustomLink-class')).not.toBeNull();
  expect(container.querySelector('.MuiButton-outlined')).not.toBeNull();

  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument();

  const button = screen.getByText(/Homepage/i);
  expect(button).toBeInTheDocument();

  fireEvent(button, new MouseEvent('click', { bubbles: true, cancelable: true }));

  expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('load and render inactive component', () => {
  window.scroll = jest.fn();
  const combinedProps = { ...testProps, active: false };
  const { container } = render(
    <>
      <CustomAnchorLink {...combinedProps} />
      <span id="home"></span>
    </>
  );

  expect(container.querySelector('.CustomLink-class')).not.toBeNull();
  expect(container.querySelector('.MuiButton-outlined')).toBeNull();

  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument();

  const button = screen.getByText(/Homepage/i);
  expect(button).toBeInTheDocument();

  fireEvent(button, new MouseEvent('click', { bubbles: true, cancelable: true }));

  expect(onClickHandler).toHaveBeenCalledTimes(1);
});
