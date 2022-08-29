import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';

import CustomLink from './index.js';

const onClickHandler = jest.fn();
const testProps = {
  title: 'Homepage',
  to: '/home',
  active: true,
  className: 'CustomLink-class',
  onClickHandler
};

const Home = () => <span>Home page</span>;
const About = () => <span>About</span>;
const App = () => (
  <>
    <Routes>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/about" element={<About />} />
    </Routes>
  </>
);

beforeEach(() => jest.clearAllMocks());

test('load and render active component', () => {
  const history = createMemoryHistory();
  history.push('/home');

  const { container } = render(
    <Router location={history.location} navigator={history}>
      <CustomLink {...testProps} />
      <App />
    </Router>
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

test('load and render active component', () => {
  const combinedProps = { ...testProps, active: false };
  const history = createMemoryHistory();
  history.push('/about');

  const { container } = render(
    <Router location={history.location} navigator={history}>
      <CustomLink {...combinedProps} />
      <App />
    </Router>
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
