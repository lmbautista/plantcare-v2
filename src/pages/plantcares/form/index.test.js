import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { LoggedUserContextProvider, mockPlantcare } from '../../../test_utils';

import PlantcareForm from './index.js';

const onSubmitHandler = jest.fn();
const App = ({ element }) => (
  <>
    <Routes>
      <Route exact path="/form" element={element} />
    </Routes>
  </>
);

beforeEach(() => jest.clearAllMocks());

test('load and render new component', () => {
  render(
    <LoggedUserContextProvider section="/form">
      <App element={<PlantcareForm onSubmitHandler={onSubmitHandler} />} />
    </LoggedUserContextProvider>
  );

  expect(screen.getAllByText('New plantcare')).toBeDefined();
  expect(screen.getAllByText('Register a new configuration')).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});

test('load and render edit component', () => {
  render(
    <LoggedUserContextProvider section="/form">
      <App
        element={<PlantcareForm plantcare={{ name: 'Ficus' }} onSubmitHandler={onSubmitHandler} />}
      />
    </LoggedUserContextProvider>
  );

  expect(screen.getAllByText('Edit plantcare')).toBeDefined();
  expect(screen.getAllByText('Apply changes to the current configuration')).toBeDefined();
  expect(screen.getAllByText('Submit')).toBeDefined();
});

test('render and submit new form', async () => {
  const formParams = {
    id: undefined,
    name: 'Ficus',
    wetSensorField: 'A0',
    waterPumpField: 'IN1'
  };

  render(
    <LoggedUserContextProvider section="/form">
      <App element={<PlantcareForm onSubmitHandler={onSubmitHandler} />} />
    </LoggedUserContextProvider>
  );

  const nameInput = screen.getAllByTestId('name-input')[0];
  const wetSensorFieldInput = screen.getAllByTestId('wet-sensor-field-input')[0];
  const waterPumpFieldInput = screen.getAllByTestId('water-pump-field-input')[0];

  expect(nameInput).not.toBeNull();
  expect(wetSensorFieldInput).not.toBeNull();
  expect(waterPumpFieldInput).not.toBeNull();

  fireEvent.change(nameInput, { target: { value: formParams.name } });
  fireEvent.change(wetSensorFieldInput, { target: { value: formParams.wetSensorField } });
  fireEvent.change(waterPumpFieldInput, { target: { value: formParams.waterPumpField } });

  await waitFor(() => {
    const submitButton = screen.getAllByText('Submit')[0];
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onSubmitHandler).toHaveBeenNthCalledWith(1, formParams);
  });
});

test('render and submit edit form', async () => {
  const plantcareId = 1;
  const plantcare = { ...mockPlantcare(), id: plantcareId };
  const formParams = {
    id: plantcareId,
    name: 'Ficus',
    wetSensorField: 'A0',
    waterPumpField: 'IN1'
  };

  render(
    <LoggedUserContextProvider section="/form">
      <App element={<PlantcareForm plantcare={plantcare} onSubmitHandler={onSubmitHandler} />} />
    </LoggedUserContextProvider>
  );

  const nameInput = screen.getAllByTestId('name-input')[0];
  const wetSensorFieldInput = screen.getAllByTestId('wet-sensor-field-input')[0];
  const waterPumpFieldInput = screen.getAllByTestId('water-pump-field-input')[0];

  expect(nameInput).not.toBeNull();
  expect(wetSensorFieldInput).not.toBeNull();
  expect(waterPumpFieldInput).not.toBeNull();

  fireEvent.change(nameInput, { target: { value: formParams.name } });
  fireEvent.change(wetSensorFieldInput, { target: { value: formParams.wetSensorField } });
  fireEvent.change(waterPumpFieldInput, { target: { value: formParams.waterPumpField } });

  await waitFor(() => {
    const submitButton = screen.getAllByText('Submit')[0];
    submitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onSubmitHandler).toHaveBeenNthCalledWith(1, formParams);
  });
});
