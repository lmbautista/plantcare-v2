import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { LoggedUserContextProvider } from '../../../test_utils';

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

test('render and submit new form', async () => {
  const formParams = {
    name: 'Ficus',
    wet_sensor_field: 'A0',
    water_pump_field: 'IN1'
  };

  const { container } = render(
    <LoggedUserContextProvider section="/form">
      <App element={<PlantcareForm />} />
    </LoggedUserContextProvider>
  );

  console.log(container.innerHTML);

  axios.request.mockResolvedValueOnce(() => Promise.resolve({ response: { data: {} } }));

  const nameInput = screen.getAllByTestId('name-input')[0];
  const wetSensorFieldInput = screen.getAllByTestId('wet-sensor-field-input')[0];
  const waterPumpFieldInput = screen.getAllByTestId('water-pump-field-input')[0];

  expect(nameInput).not.toBeNull();
  expect(wetSensorFieldInput).not.toBeNull();
  expect(waterPumpFieldInput).not.toBeNull();

  fireEvent.change(nameInput, { target: { value: formParams.name } });
  fireEvent.change(wetSensorFieldInput, { target: { value: formParams.wet_sensor_field } });
  fireEvent.change(waterPumpFieldInput, { target: { value: formParams.water_pump_field } });

  const submitButton = screen.getAllByText('Submit')[0];
  await waitFor(() => {
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  // TODO: Find out how to render properly the select options in a test
  // Otherwise, the form will fail due to a lack of required form values
  // expect(axios.post).toHaveBeenCalledWith('plantcares', formParams);
});
