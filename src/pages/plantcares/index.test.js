import React from 'react';
import axios from 'axios';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { LoggedUserContextProvider } from '../../test_utils';
import { UserContextProvider } from '../../UserContext';
import * as PlantcaresApiClient from '../../api-client/plantcares';

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
    expect(screen.queryAllByTestId('edit-button')).not.toEqual([]);

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
    expect(screen.queryAllByTestId('new-plantcare-button')[0]).not.toEqual([]);

    const newPlantcareButton = screen.queryAllByTestId('new-plantcare-button')[0];
    fireEvent(newPlantcareButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(screen.queryAllByTestId('form')[0]).toBeVisible();
    expect(screen.queryAllByTestId('close-form')[0]).toBeVisible();
  });
});

test('load plantcares and create plantcare', async () => {
  axios.request.mockResolvedValueOnce({ status: 200, data: [] }); // GET plantcares
  axios.request.mockResolvedValueOnce({ status: 201, data: {} }); // POST plantcare
  axios.request.mockResolvedValueOnce({ status: 200, data: plantcares }); // GET plantcares

  render(
    <LoggedUserContextProvider section="/plantcares">
      <Plantcares />
    </LoggedUserContextProvider>
  );

  expect(screen.queryAllByTestId('plantcare-card')).toHaveLength(0);

  const newPlantcareButton = screen.queryAllByTestId('new-plantcare-button')[0];
  fireEvent(newPlantcareButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

  const nameInput = screen.getAllByTestId('name-input')[0];
  const wetSensorFieldInput = screen.getAllByTestId('wet-sensor-field-input')[0];
  const waterPumpFieldInput = screen.getAllByTestId('water-pump-field-input')[0];

  fireEvent.change(nameInput, { target: { value: 'Ficus' } });
  fireEvent.change(wetSensorFieldInput, { target: { value: 'A0' } });
  fireEvent.change(waterPumpFieldInput, { target: { value: 'IN1' } });

  const submitButton = screen.getAllByText('Submit')[0];
  submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

  await waitFor(() => {
    expect(screen.queryAllByTestId('plantcare-card')).toHaveLength(1);
    expect(screen.queryByText('Congratulations, everything worked fine!')).toBeDefined();
  });
});

test('load plantcares and update plantcare', async () => {
  const newPlantcareName = 'Ficus EDITED';
  axios.request.mockResolvedValueOnce({ status: 200, data: plantcares }); // GET plantcares
  axios.request.mockResolvedValueOnce({
    status: 200,
    data: { ...plantcare, name: newPlantcareName }
  }); // PUT plantcare

  render(
    <LoggedUserContextProvider section="/plantcares">
      <Plantcares />
    </LoggedUserContextProvider>
  );

  await waitFor(() => {
    expect(screen.queryAllByTestId('plantcare-card')).toHaveLength(1);

    const editButton = screen.queryAllByTestId('edit-button')[0];
    fireEvent(editButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

    const nameInput = screen.getAllByTestId('name-input')[0];
    fireEvent.change(nameInput, { target: { value: newPlantcareName } });

    const wetSensorFieldInput = screen.getAllByTestId('wet-sensor-field-input')[0];
    fireEvent.change(wetSensorFieldInput, { target: { value: 'A0' } });

    const waterPumpFieldInput = screen.getAllByTestId('water-pump-field-input')[0];
    fireEvent.change(waterPumpFieldInput, { target: { value: 'IN1' } });

    const submitButton = screen.getAllByText('Submit')[0];
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });

  expect(screen.getByText(newPlantcareName)).toBeDefined();
  expect(screen.queryByText('Congratulations, everything worked fine!')).toBeDefined();
});

test('delete plantcares successfully', async () => {
  const getPlantcaresResponse = { status: 200, data: plantcares };
  const deletePlantcareResponse = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(getPlantcaresResponse);
  axios.request.mockResolvedValueOnce(deletePlantcareResponse);
  axios.request.mockResolvedValueOnce({ status: 200, data: [] });

  render(
    <LoggedUserContextProvider section="/plantcares">
      <Plantcares />
    </LoggedUserContextProvider>
  );

  await waitFor(() => {
    expect(screen.queryAllByTestId('plantcare-card')).toHaveLength(1);
    expect(screen.queryAllByTestId('remove-button')).not.toEqual([]);

    const deletePlantcareButton = screen.queryAllByTestId('remove-button')[0];
    fireEvent(deletePlantcareButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(screen.queryAllByTestId('plantcare-card')).toHaveLength(0);
    expect(screen.queryByText('Congratulations, everything worked fine!')).toBeDefined();
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
