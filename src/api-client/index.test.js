import axios from 'axios';
import { waitFor } from '@testing-library/react';

import * as ApiClient from '.';

beforeEach(() => jest.clearAllMocks());

test('httpRequest success', async () => {
  const plantcareId = 1;
  const formParams = {
    id: plantcareId,
    name: 'Ficus',
    wetSensorField: 'A0',
    waterPumpField: 'IN1'
  };
  const requestData = {
    id: formParams.id,
    name: formParams.name,
    wet_sensor_field: formParams.wetSensorField,
    water_pump_field: formParams.waterPumpField
  };
  const method = 'PUT';
  const url = `plantcares/${plantcareId}`;
  const data = { ...formParams };
  const headers = { Authorization: 'Token asi0o12309djknsdoi8' };
  const onSuccessHandler = jest.fn(() => {});
  const onErrorHandler = jest.fn(() => {});
  const onFinishHandler = jest.fn(() => {});
  const response = {
    data: { name: 'Ficus', wet_sensor_field: 'A0', water_pump_field: 'IN1' }
  };
  const requestParams = { data: requestData, headers, method, url };

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
    expect(onSuccessHandler).toHaveBeenNthCalledWith(1, {
      name: 'Ficus',
      wetSensorField: 'A0',
      waterPumpField: 'IN1'
    });
    expect(onErrorHandler).toHaveBeenCalledTimes(0);
    expect(onFinishHandler).toHaveBeenCalledTimes(1);
  });
});

test('httpRequest fails with error 404', async () => {
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
  const responseMessage = errorResponse.response.statusText;
  const errorDetails = { responseMessage, responseErrors: undefined };
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
    expect(onErrorHandler).toHaveBeenNthCalledWith(1, errorDetails);
    expect(onFinishHandler).toHaveBeenCalledTimes(1);
  });
});

test('httpRequest fails with error 422', async () => {
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
      status: 422,
      data: { message: 'Invalid resource', errors: { waterPumpId: 'blank' } }
    }
  };
  const responseMessage = errorResponse.response.data.message;
  const errorDetails = {
    responseMessage,
    responseErrors: { ...errorResponse.response.data.errors }
  };
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
    expect(onErrorHandler).toHaveBeenNthCalledWith(1, errorDetails);
    expect(onFinishHandler).toHaveBeenCalledTimes(1);
  });
});

test('httpRequest fails with client error', async () => {
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
  const errorResponse = { message: 'timeout of 5000ms exceeded' };
  const errorDetails = {
    responseMessage: `HTTP error: ${errorResponse.message}`,
    responseErrors: undefined
  };
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
    expect(onErrorHandler).toHaveBeenNthCalledWith(1, errorDetails);
    expect(onFinishHandler).toHaveBeenCalledTimes(1);
  });
});

test('httpRequest fails with error 500', async () => {
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
      status: 500,
      statusText: 'Internal Server Error'
    }
  };
  const errorDetails = {
    responseMessage: `Ops! There server reported a problem: ${errorResponse.response.statusText}`,
    responseErrors: undefined
  };
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
    expect(onErrorHandler).toHaveBeenNthCalledWith(1, errorDetails);
    expect(onFinishHandler).toHaveBeenCalledTimes(1);
  });
});
