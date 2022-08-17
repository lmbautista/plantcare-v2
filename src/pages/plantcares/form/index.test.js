import React from 'react';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { UserContextProvider } from '../../../UserContext.js';
import User from '../../../components/user';
import * as Utils from '../../../utils';

import PlantcareForm from './index.js';

const apiToken = 'apiToken';

const App = ({ element }) => (
  <>
    <Routes>
      <Route exact path="/form" element={element} />
    </Routes>
  </>
);

test('load and render new component', () => {
  const history = createMemoryHistory();
  history.push('/form');

  Utils.setSessionCookies({ email: 'lmiguelbautista@gmail.com', api_token: apiToken }, history);
  const user = User({ history });

  render(
    <UserContextProvider user={user}>
      <Router location={history.location} navigator={history}>
        <App element={<PlantcareForm />} />
      </Router>
    </UserContextProvider>
  );

  expect(screen.getAllByText('New plantcare')).toBeDefined();
  expect(screen.getAllByText('Register a new configuration')).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});

test('load and render edit component', () => {
  const history = createMemoryHistory();
  history.push('/form');

  Utils.setSessionCookies({ email: 'lmiguelbautista@gmail.com', api_token: apiToken }, history);
  const user = User({ history });

  render(
    <UserContextProvider user={user}>
      <Router location={history.location} navigator={history}>
        <App element={<PlantcareForm plantcare={{ name: 'Ficus' }} />} />
      </Router>
    </UserContextProvider>
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

  const history = createMemoryHistory();
  history.push('/form');

  Utils.setSessionCookies({ email: 'lmiguelbautista@gmail.com', api_token: apiToken }, history);
  const user = User({ history });

  const { container } = render(
    <UserContextProvider user={user}>
      <Router location={history.location} navigator={history}>
        <App element={<PlantcareForm />} />
      </Router>
    </UserContextProvider>
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
