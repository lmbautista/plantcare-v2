import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoggedUserContextProvider } from '../../../test_utils';

import FormCard from './index.js';

test('load and render component', () => {
  render(
    <LoggedUserContextProvider>
      <FormCard />
    </LoggedUserContextProvider>
  );

  expect(screen.queryAllByTestId('form')[0]).toBeVisible();
  expect(screen.queryAllByTestId('close-form')[0]).toBeVisible();
});
