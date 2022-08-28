import axios from 'axios';
import { waitFor } from '@testing-library/react';

import * as ApiClient from '.';

beforeEach(() => jest.clearAllMocks());

test('httpRequest success', async () => {
  const plantcareId = 1;
  const formParams = {
    id: plantcareId,
    name: 'Ficus',
    wet_sensor_field: 'A0',
    water_pump_field: 'IN1'
  };
  const method = 'PUT';
  const url = `plantcares/${plantcareId}`;
  const data = { ...formParams };
  const headers = { Authorization: 'Token asi0o12309djknsdoi8' };
  const onSuccessHandler = jest.fn(() => {});
  const onErrorHandler = jest.fn(() => {});
  const onFinishHandler = jest.fn(() => {});
  const response = { response: { data: {} } };
  const requestParams = { data, headers, method, url };

  axios.request.mockResolvedValue(response);

  ApiClient.httpRequest({
    method,
    url,
    headers,
    data,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  });

  await waitFor(() => {
    expect(axios.request).toHaveBeenCalledWith(requestParams);
    expect(onSuccessHandler).toHaveBeenNthCalledWith(1, response.data);
    expect(onErrorHandler).toHaveBeenCalledTimes(0);
    expect(onFinishHandler).toHaveBeenCalledTimes(1);
  });
});

test('httpRequest fails', async () => {
  const plantcareId = 1;
  const formParams = {
    id: plantcareId,
    name: 'Ficus',
    wet_sensor_field: 'A0',
    water_pump_field: 'IN1'
  };
  const method = 'PUT';
  const url = `plantcares/${plantcareId}`;
  const data = { ...formParams };
  const headers = { Authorization: 'Token asi0o12309djknsdoi8' };
  const onSuccessHandler = jest.fn(() => {});
  const onErrorHandler = jest.fn(() => {});
  const onFinishHandler = jest.fn(() => {});
  const requestParams = { data, headers, method, url };
  const errorResponse = {
    response: {
      status: 404,
      statusText: 'Not found',
      data: {}
    }
  };
  const errorMessage = `HTTP error: ${errorResponse.response.statusText}`;

  axios.request.mockRejectedValue(errorResponse);

  jest.mock('../utils', () => jest.fn(() => {}));

  ApiClient.httpRequest({
    method,
    url,
    headers,
    data,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  });

  await waitFor(() => {
    expect(axios.request).toHaveBeenCalledWith(requestParams);
    expect(onSuccessHandler).toHaveBeenCalledTimes(0);
    expect(onErrorHandler).toHaveBeenNthCalledWith(1, errorMessage);
    expect(onFinishHandler).toHaveBeenCalledTimes(1);
  });
});
