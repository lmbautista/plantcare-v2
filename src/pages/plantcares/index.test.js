import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { UserContextProvider } from '../../UserContext.js';
import axios from 'axios';
import * as Utils from '../../utils';
import User from '../../components/user';

import Plantcares from './index.js';

test('load and render empty component', async () => {
  const history = createMemoryHistory();
  history.push('/plantcares');

  Utils.setSessionCookies({ email: 'lmiguelbautista@gmail.com', api_token: apiToken }, history);
  const user = User({ history });

  const response = { status: 200, data: [] };
  axios.get.mockResolvedValueOnce(response);

  render(
    <UserContextProvider user={user}>
      <Router location={history.location} navigator={history}>
        <Plantcares />
      </Router>
    </UserContextProvider>
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

const apiToken = 'apiToken';
const requestParams = { locale: 'en', headers: { Authorization: `Token ${apiToken}` } };
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
  const history = createMemoryHistory();
  history.push('/plantcares');

  Utils.setSessionCookies({ email: 'lmiguelbautista@gmail.com', api_token: apiToken }, history);
  const user = User({ history });

  const response = { status: 200, data: plantcares };
  axios.get.mockResolvedValueOnce(response);

  render(
    <UserContextProvider user={user}>
      <Router location={history.location} navigator={history}>
        <Plantcares />
      </Router>
    </UserContextProvider>
  );

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith('plantcares', requestParams);
    expect(screen.queryAllByText('Plantcares not found')).toEqual([]);
    expect(screen.queryAllByText('Waterings not found')).toEqual([]);
    expect(screen.queryAllByText(plantcares[0].name)).not.toBeNull();
    expect(screen.queryAllByText(plantcares[0].waterings[0].programmed_at)).not.toBeNull();
  });
});
