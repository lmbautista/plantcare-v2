import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { LoggedUserContextProvider } from '../../../test_utils';

import WateringForm from './index.js';

const watering = {
  duration_unit: 'seconds',
  duration_amount: '6',
  status: 'programmed',
  programmed_at: '06/07/2022 15:45',
  consumed_at: null,
  water_pump_field: 'IN1',
  water_pump_id: 1,
  watering_schedule_id: null,
  plantcare_name: 'Ficus'
};

const plantcare = {
  id: 1,
  name: 'Ficus retusa',
  wet: 35.2,
  planted_at: '03/03/2022',
  watered_at: '03/03/2022 15:35',
  waterings: [{ programmed_at: '03/03/2022 21:22' }],
  water_pump_id: 1,
  wet_synced_at: '03/03/2022 16:45',
  last_connection_at: '03/03/2022 16:45'
};
const plantcares = [plantcare];

const onSubmitHandler = jest.fn();
const App = ({ element }) => (
  <>
    <Routes>
      <Route exact path="/form" element={element} />
    </Routes>
  </>
);

beforeEach(() => jest.clearAllMocks());

test('load and render new component', async () => {
  const response = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(response); //GET plantcares

  render(
    <LoggedUserContextProvider section="/form">
      <App element={<WateringForm onSubmitHandler={onSubmitHandler} />} />
    </LoggedUserContextProvider>
  );

  await waitFor(() => {
    expect(screen.getAllByText('New watering')).toBeDefined();
    expect(screen.getAllByText('Register a new watering')).toBeDefined();
    expect(screen.getAllByText('Submit')).toBeDefined();
  });
});

test('load and render edit component', async () => {
  const response = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(response); //GET plantcares

  render(
    <LoggedUserContextProvider section="/form">
      <App
        element={
          <WateringForm watering={{ ...watering, id: 1 }} onSubmitHandler={onSubmitHandler} />
        }
      />
    </LoggedUserContextProvider>
  );

  await waitFor(() => {
    expect(screen.getAllByText('Edit watering')).toBeDefined();
    expect(screen.getAllByText('Apply changes to the current pending watering')).toBeDefined();
    expect(screen.getAllByText('Submit')).toBeDefined();
  });
});

test('load and render edit component with null fields', async () => {
  const response = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(response); //GET plantcares

  render(
    <LoggedUserContextProvider section="/form">
      <App
        element={
          <WateringForm
            watering={{ ...watering, id: 1, duration_amount: null }}
            onSubmitHandler={onSubmitHandler}
          />
        }
      />
    </LoggedUserContextProvider>
  );
  await waitFor(() => {
    expect(screen.getAllByText('Edit watering')).toBeDefined();
    expect(screen.getAllByText('Apply changes to the current pending watering')).toBeDefined();
    expect(screen.getAllByText('Submit')).toBeDefined();
  });
});

test('render and submit new form', async () => {
  const response = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(response); // GET plantcares

  const formParams = {
    id: undefined,
    durationAmount: '5',
    durationUnit: 'seconds',
    programmedAt: '2022-09-07T17:01',
    waterPumpId: undefined
  };

  render(
    <LoggedUserContextProvider section="/form">
      <App element={<WateringForm onSubmitHandler={onSubmitHandler} />} />
    </LoggedUserContextProvider>
  );

  let waterPumpIdInput;
  await waitFor(() => {
    waterPumpIdInput = screen.getAllByTestId('water-pump-id-input')[0];
  });

  const durationAmountInput = screen.getAllByTestId('duration-amount-input')[0];
  const durationUnitInput = screen.getAllByTestId('duration-unit-input')[0];
  const programmedAtInput = screen.getAllByTestId('programmed-at-input')[0];

  expect(durationAmountInput).not.toBeNull();
  expect(durationUnitInput).not.toBeNull();
  expect(programmedAtInput).not.toBeNull();
  expect(waterPumpIdInput).not.toBeNull();

  fireEvent.change(durationAmountInput, { target: { value: formParams.durationAmount } });
  fireEvent.change(durationUnitInput, { target: { value: formParams.durationUnit } });
  fireEvent.change(programmedAtInput, { target: { value: formParams.programmedAt } });
  fireEvent.change(waterPumpIdInput, { target: { value: plantcare.water_pump_id } });

  await waitFor(() => {
    screen
      .getByText('Submit')
      .dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(onSubmitHandler).toHaveBeenNthCalledWith(1, formParams);
  });
});

test('render and submit edit form', async () => {
  const response = { status: 200, data: plantcares };
  axios.request.mockResolvedValueOnce(response); // GET plantcares

  const formParams = {
    id: 1,
    durationAmount: '5',
    durationUnit: 'seconds',
    programmedAt: '2022-09-07T17:01',
    waterPumpId: 1
  };

  render(
    <LoggedUserContextProvider section="/form">
      <App
        element={
          <WateringForm
            onSubmitHandler={onSubmitHandler}
            watering={{ ...watering, id: formParams.id }}
          />
        }
      />
    </LoggedUserContextProvider>
  );

  let waterPumpIdInput;
  await waitFor(() => {
    waterPumpIdInput = screen.getAllByTestId('water-pump-id-input')[0];
  });

  const durationAmountInput = screen.getAllByTestId('duration-amount-input')[0];
  const durationUnitInput = screen.getAllByTestId('duration-unit-input')[0];
  const programmedAtInput = screen.getAllByTestId('programmed-at-input')[0];

  expect(durationAmountInput).not.toBeNull();
  expect(durationUnitInput).not.toBeNull();
  expect(programmedAtInput).not.toBeNull();
  expect(waterPumpIdInput).not.toBeNull();

  fireEvent.change(durationAmountInput, { target: { value: formParams.durationAmount } });
  fireEvent.change(durationUnitInput, { target: { value: formParams.durationUnit } });
  fireEvent.change(programmedAtInput, { target: { value: formParams.programmedAt } });
  fireEvent.change(waterPumpIdInput, { target: { value: plantcare.water_pump_id } });

  await waitFor(() => {
    screen
      .getByText('Submit')
      .dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(onSubmitHandler).toHaveBeenNthCalledWith(1, formParams);
  });
});
