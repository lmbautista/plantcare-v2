import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { LoggedUserContextProvider, mockPlantcare } from '../../../test_utils';

import PlantcareForm from './index.js';

const App = ({ element }) => (
  <>
    <Routes>
      <Route exact path="/form" element={element} />
    </Routes>
  </>
);

test('load and render new component', () => {
  render(
    <LoggedUserContextProvider section="/form">
      <App element={<PlantcareForm />} />
    </LoggedUserContextProvider>
  );

  expect(screen.getAllByText('New plantcare')).toBeDefined();
  expect(screen.getAllByText('Register a new configuration')).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});

test('load and render edit component', () => {
  render(
    <LoggedUserContextProvider section="/form">
      <App element={<PlantcareForm plantcare={{ name: 'Ficus' }} />} />
    </LoggedUserContextProvider>
  );

  expect(screen.getAllByText('Edit plantcare')).toBeDefined();
  expect(screen.getAllByText('Apply changes to the current configuration')).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});

test('render and submit edit form', async () => {
  const plantcareId = 1;
  const plantcare = { ...mockPlantcare(), id: plantcareId };
  const onSubmitHandler = jest.fn();
  const formParams = {
    id: plantcareId,
    name: 'Ficus',
    wet_sensor_field: 'A0',
    water_pump_field: 'IN1'
  };
  const requestParams = {
    data: { ...formParams },
    headers: { Authorization: 'Token asi0o12309djknsdoi8', locale: 'en' },
    method: 'PUT',
    url: `plantcares/${plantcareId}`
  };

  render(
    <LoggedUserContextProvider section="/form">
      <App element={<PlantcareForm plantcare={plantcare} onSubmitHandler={onSubmitHandler} />} />
    </LoggedUserContextProvider>
  );

  axios.request.mockResolvedValue(() => Promise.resolve({ response: { data: {} } }));

  const nameInput = screen.getAllByTestId('name-input')[0];
  const wetSensorFieldInput = screen.getAllByTestId('wet-sensor-field-input')[0];
  const waterPumpFieldInput = screen.getAllByTestId('water-pump-field-input')[0];

  expect(nameInput).not.toBeNull();
  expect(wetSensorFieldInput).not.toBeNull();
  expect(waterPumpFieldInput).not.toBeNull();

  fireEvent.change(nameInput, { target: { value: formParams.name } });
  fireEvent.change(wetSensorFieldInput, { target: { value: formParams.wet_sensor_field } });
  fireEvent.change(waterPumpFieldInput, { target: { value: formParams.water_pump_field } });

  await waitFor(() => {
    const submitButton = screen.getAllByText('Submit')[0];
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(axios.request).toHaveBeenCalledWith(requestParams);
    expect(screen.getByText(/Congratulations, everything worked fine!/i)).toBeInTheDocument();
    expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  });
});

test('render and submit new form', async () => {
  const formParams = {
    name: 'Ficus',
    wet_sensor_field: 'A0',
    water_pump_field: 'IN1'
  };
  const requestParams = {
    data: { id: undefined, ...formParams },
    headers: { Authorization: 'Token asi0o12309djknsdoi8', locale: 'en' },
    method: 'POST',
    url: 'plantcares'
  };
  const onSubmitHandler = jest.fn();

  render(
    <LoggedUserContextProvider section="/form">
      <App element={<PlantcareForm onSubmitHandler={onSubmitHandler} />} />
    </LoggedUserContextProvider>
  );

  axios.request.mockResolvedValue(() => Promise.resolve({ response: { data: {} } }));

  const nameInput = screen.getAllByTestId('name-input')[0];
  const wetSensorFieldInput = screen.getAllByTestId('wet-sensor-field-input')[0];
  const waterPumpFieldInput = screen.getAllByTestId('water-pump-field-input')[0];

  expect(nameInput).not.toBeNull();
  expect(wetSensorFieldInput).not.toBeNull();
  expect(waterPumpFieldInput).not.toBeNull();

  fireEvent.change(nameInput, { target: { value: formParams.name } });
  fireEvent.change(wetSensorFieldInput, { target: { value: formParams.wet_sensor_field } });
  fireEvent.change(waterPumpFieldInput, { target: { value: formParams.water_pump_field } });

  await waitFor(() => {
    const submitButton = screen.getAllByText('Submit')[0];
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(axios.request).toHaveBeenCalledWith(requestParams);
    expect(screen.getByText(/Congratulations, everything worked fine!/i)).toBeInTheDocument();
    expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  });
});
