import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import PlantcareCard from './index.js';
import { UserContextProvider } from '../../../UserContext.js';
import User from '../../../components/user';
import * as Utils from '../../../utils';

const apiToken = 'apiToken';

test('load and render component', () => {
  const plantcare = Utils.mockPlantcare();

  render(<PlantcareCard plantcare={plantcare} />);

  expect(screen.getByTestId('actions')).toBeInTheDocument();
  expect(screen.getByTestId('details')).toBeInTheDocument();
  expect(screen.getByTestId('wetstatus')).toBeInTheDocument();

  expect(screen.getAllByText(`Synced at ${plantcare.wet_synced_at}`)).toBeDefined();
  expect(screen.getAllByText(`Planted at ${plantcare.planted_at}`)).toBeDefined();
  expect(screen.getAllByText(`Watered at ${plantcare.watered_at}`)).toBeDefined();
  expect(screen.getAllByText(`Watering at ${plantcare.waterings[0].programmed_at}`)).toBeDefined();
});

test('render edit component', () => {
  const plantcare = Utils.mockPlantcare();

  const history = createMemoryHistory();
  history.push('/form');

  Utils.setSessionCookies({ email: 'lmiguelbautista@gmail.com', api_token: apiToken }, history);
  const user = User({ history });

  render(
    <UserContextProvider user={user}>
      <PlantcareCard plantcare={plantcare} />
    </UserContextProvider>
  );

  expect(screen.queryAllByTestId('open-form')).toBeDefined();

  const editButton = screen.queryAllByTestId('open-form')[0];
  fireEvent(editButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

  expect(screen.queryAllByTestId('form')[0]).toBeVisible();
  expect(screen.queryAllByTestId('close-form')[0]).toBeVisible();
});
