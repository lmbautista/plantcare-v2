import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoggedUserContextProvider } from '../../../test_utils';
import { mockPlantcare } from '../../../test_utils';

import FormCard from './index.js';

test('load and render component', () => {
  render(
    <LoggedUserContextProvider>
      <FormCard />
    </LoggedUserContextProvider>
  );

  expect(screen.queryByTestId('form')).toBeVisible();
  expect(screen.queryByTestId('close-form')).toBeVisible();
});

test('load and render component with all props', () => {
  const plantcare = mockPlantcare();
  const onCloseHandler = jest.fn();
  const onSubmitHandler = jest.fn();
  const props = { plantcare, onCloseHandler, onSubmitHandler };

  render(
    <LoggedUserContextProvider>
      <FormCard {...props} />
    </LoggedUserContextProvider>
  );

  const closeButton = screen.queryByTestId('close-form');
  fireEvent(closeButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

  expect(onCloseHandler).toHaveBeenCalledTimes(1);
});
