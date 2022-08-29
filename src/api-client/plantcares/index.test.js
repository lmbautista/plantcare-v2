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
