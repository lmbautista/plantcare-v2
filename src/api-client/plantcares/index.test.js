import * as ApiClient from '..';

import * as PlantcaresApiClient from '.';

test('getPlantcares', () => {
  const headers = { Authorization: 'Token asi0o12309djknsdoi8' };
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const params = { headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'GET',
    url: 'plantcares',
    headers,
    data: {},
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  PlantcaresApiClient.getPlantcares(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});

test('deletePlantcare', () => {
  const headers = { Authorization: 'Token asi0o12309djknsdoi8' };
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const plantcareId = 1;
  const params = { id: plantcareId, headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'DELETE',
    url: `plantcares/${plantcareId}`,
    headers,
    data: {},
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  PlantcaresApiClient.deletePlantcare(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});

test('getPlantcare', () => {
  const headers = { Authorization: 'Token asi0o12309djknsdoi8' };
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const plantcareId = 1;
  const params = { id: plantcareId, headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'GET',
    url: `plantcares/${plantcareId}`,
    headers,
    data: {},
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  PlantcaresApiClient.getPlantcare(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});

test('createPlantcare', () => {
  const headers = { Authorization: 'Token asi0o12309djknsdoi8' };
  const data = { name: 'Ficus' };
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const plantcareId = 1;
  const params = { data, headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'POST',
    url: 'plantcares',
    headers,
    data,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  PlantcaresApiClient.createPlantcare(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});

test('updatePlantcare', () => {
  const headers = { Authorization: 'Token asi0o12309djknsdoi8' };
  const plantcareId = 1;
  const data = { id: plantcareId, name: 'Ficus' };
  const onSuccessHandler = jest.fn();
  const onErrorHandler = jest.fn();
  const params = { data, headers, onSuccessHandler, onErrorHandler };
  const requestParams = {
    method: 'PUT',
    url: `plantcares/${plantcareId}`,
    headers,
    data,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler: undefined
  };

  const mockHttpRequest = jest.fn();
  ApiClient.httpRequest = mockHttpRequest;

  PlantcaresApiClient.updatePlantcare(params);

  expect(mockHttpRequest).toHaveBeenNthCalledWith(1, requestParams);
});
