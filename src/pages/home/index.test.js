import React from 'react';
import { render } from '@testing-library/react';
import Home from './index.js';

test('load and render component', () => {
  const { container } = render(<Home />);

  expect(container.querySelector('#home'));
  expect(container.querySelector('#features'));
  expect(container.querySelector('#about'));
  expect(container.querySelector('#contact'));
  expect(container.querySelector('#signup'));
  expect(container.querySelector('#signin'));
});
