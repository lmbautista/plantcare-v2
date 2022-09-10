import * as ApiClient from '..';

import * as WateringsApiClient from '.';

const headers = { Authorization: 'Token asi0o12309djknsdoi8' };

test('getWaterings', () => {
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const params = { headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'GET',
    url: 'waterings',
    headers,
    data: {},
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  WateringsApiClient.getWaterings(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});

test('deleteWatering', () => {
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const plantcareId = 1;
  const params = { id: plantcareId, headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'DELETE',
    url: `waterings/${plantcareId}`,
    headers,
    data: {},
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  WateringsApiClient.deleteWatering(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});

test('getWatering', () => {
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const plantcareId = 1;
  const params = { id: plantcareId, headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'GET',
    url: `waterings/${plantcareId}`,
    headers,
    data: {},
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  WateringsApiClient.getWatering(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});

test('createWatering', () => {
  const data = { name: 'Ficus', waterPumpId: 'IN1', wetSensorId: 'A1' };
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const params = { data, headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'POST',
    url: 'waterings',
    headers,
    data,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  WateringsApiClient.createWatering(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});

test('updateWatering', () => {
  const plantcareId = 1;
  const data = { id: plantcareId, name: 'Ficus', waterPumpId: 'IN1', wetSensorId: 'A1' };
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const params = { data, headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'PUT',
    url: `waterings/${plantcareId}`,
    headers,
    data,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  WateringsApiClient.updateWatering(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});
