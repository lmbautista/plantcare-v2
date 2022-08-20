import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { UserContextProvider } from '../../UserContext.js';
import axios from 'axios';
import { LoggedUserContextProvider, USER_API_TOKEN } from '../../test_utils';

import Plantcares from './index.js';

test('load and render empty component', async () => {
  const response = { status: 200, data: [] };
  axios.get.mockResolvedValueOnce(response);

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
    expect(axios.get).toHaveBeenCalledWith('plantcares', requestParams);
    expect(screen.getAllByText('Plantcares not found')).toHaveLength(2);
    expect(screen.getAllByText('Waterings not found')).toHaveLength(2);
    expect(screen.queryByText(plantcares[0].name)).toBeNull();
  });
});

test('initial render prevent loading plantcares', () => {
  const history = createMemoryHistory();
  history.push('/plantcares');

  render(
    <UserContextProvider>
      <Router location={history.location} navigator={history}>
        <Plantcares />
      </Router>
    </UserContextProvider>
  );

  expect(axios.get).not.toHaveBeenCalledWith('plantcares', { params: requestParams });
});

const requestParams = { locale: 'en', headers: { Authorization: `Token ${USER_API_TOKEN}` } };
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

test('load plantcares successfully', async () => {
  const response = { status: 200, data: plantcares };
  axios.get.mockResolvedValueOnce(response);

  render(
    <LoggedUserContextProvider section="/plantcares">
      <Plantcares />
    </LoggedUserContextProvider>
  );

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith('plantcares', requestParams);
    expect(screen.queryAllByText('Plantcares not found')).toEqual([]);
    expect(screen.queryAllByText('Waterings not found')).toEqual([]);
    expect(screen.queryAllByText(plantcares[0].name)).not.toBeNull();
    expect(screen.queryAllByText(plantcares[0].waterings[0].programmed_at)).not.toBeNull();
  });
});
