import React from 'react';
import axios from 'axios';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { LoggedUserContextProvider } from '../../test_utils';
import { UserContextProvider } from '../../UserContext';
import * as PlantcaresApiClient from '../../api-client/plantcares';

import Plantcares from './index.js';

afterEach(() => jest.clearAllMocks());

const plantcares = [
  {
    name: 'Ficus retusa',
    wet: 35.2,
    planted_at: '03/03/2022',
    watered_at: '03/03/2022 15:35',
    waterings: [{ programmed_at: '03/03/2022 21:22' }],
    wet_synced_at: '03/03/2022 16:45',
    last_connection_at: '03/03/2022 16:45'
  }
];

test('load and render empty component', async () => {
  const response = { status: 200, data: [] };
  axios.request.mockResolvedValueOnce(response);

  render(
    <LoggedUserContextProvider section="/plantcares">
      <Plantcares />
    </LoggedUserContextProvider>
  );

  expect(screen.getByTestId('plantcares')).toBeInTheDocument();
  expect(screen.getByTestId('garden')).toBeInTheDocument();
  expect(screen.getByTestId('watering')).toBeInTheDocument();
  expect(screen.getByTestId('connectivity')).toBeInTheDocument();
  expect(screen.getByTestId('howto')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getAllByText('Plantcares not found')).toHaveLength(2);
    expect(screen.getAllByText('Waterings not found')).toHaveLength(2);
    expect(screen.queryByText(plantcares[0].name)).toBeNull();
  });
});

test('load plantcares successfully', async () => {
  const response = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(response);

  render(
    <LoggedUserContextProvider section="/plantcares">
      <Plantcares />
    </LoggedUserContextProvider>
  );

  await waitFor(() => {
    expect(screen.queryAllByText('Plantcares not found')).toEqual([]);
    expect(screen.queryAllByText('Waterings not found')).toEqual([]);
    expect(screen.queryAllByText(plantcares[0].name)).not.toBeNull();
    expect(screen.queryAllByText(plantcares[0].waterings[0].programmed_at)).not.toBeNull();
  });
});

test('load plantcares and render edit plantcare component', async () => {
  const response = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(response);

  render(
    <LoggedUserContextProvider section="/plantcares">
      <Plantcares />
    </LoggedUserContextProvider>
  );

  await waitFor(() => {
    expect(screen.queryAllByTestId('edit-button')).toBeDefined();

    const editPlantcareButton = screen.queryAllByTestId('edit-button')[0];
    fireEvent(editPlantcareButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(screen.queryAllByTestId('form')[0]).toBeVisible();
    expect(screen.queryAllByTestId('close-form')[0]).toBeVisible();
  });
});

test('load plantcares and render new plantcare component', async () => {
  const response = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(response);

  render(
    <LoggedUserContextProvider section="/plantcares">
      <Plantcares />
    </LoggedUserContextProvider>
  );

  await waitFor(() => {
    expect(screen.queryAllByTestId('new-plantcare-button')[0]).toBeDefined();

    const newPlantcareButton = screen.queryAllByTestId('new-plantcare-button')[0];
    fireEvent(newPlantcareButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(screen.queryAllByTestId('form')[0]).toBeVisible();
    expect(screen.queryAllByTestId('close-form')[0]).toBeVisible();
  });
});

test('initial render prevent loading plantcares', () => {
  const history = createMemoryHistory();
  history.push('/plantcares');

  const mockPlantcaresApiClient = jest.fn();
  PlantcaresApiClient.getPlantcares = mockPlantcaresApiClient;

  render(
    <UserContextProvider>
      <Router location={history.location} navigator={history}>
        <Plantcares />
      </Router>
    </UserContextProvider>
  );

  expect(mockPlantcaresApiClient).not.toHaveBeenCalled();
});
