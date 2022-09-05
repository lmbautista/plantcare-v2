import React from 'react';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import { LoggedUserContextProvider } from '../../test_utils';

import Plantcares from './index.js';

beforeEach(() => jest.clearAllMocks());

const plantcare = {
  id: 1,
  name: 'Ficus retusa',
  wet: 35.2,
  planted_at: '03/03/2022',
  watered_at: '03/03/2022 15:35',
  waterings: [{ programmed_at: '03/03/2022 21:22' }],
  wet_synced_at: '03/03/2022 16:45',
  last_connection_at: '03/03/2022 16:45'
};
const plantcares = [plantcare];

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
