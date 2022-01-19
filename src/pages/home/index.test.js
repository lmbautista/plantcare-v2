import React from 'react';
import { render } from '@testing-library/react';
import Home from './index.js';

test('load and render component', () => {
  const { container } = render(<Home />);

  expect(container.querySelector('#home')).not.toBeNull();
  expect(container.querySelector('#features')).not.toBeNull();
  expect(container.querySelector('#about')).not.toBeNull();
  expect(container.querySelector('#contact')).not.toBeNull();
  expect(container.querySelector('#signup')).not.toBeNull();
  expect(container.querySelector('#signin')).not.toBeNull();
});
