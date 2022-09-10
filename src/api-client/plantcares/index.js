import * as ApiClient from '..';

export const getPlantcares = ({ headers, onSuccessHandler, onErrorHandler, onFinishHandler }) => {
  const params = {
    method: 'GET',
    url: 'plantcares',
    data: {},
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};

export const getPlantcare = ({
  id,
  headers,
  onSuccessHandler,
  onErrorHandler,
  onFinishHandler
}) => {
  const params = {
    method: 'GET',
    url: `plantcares/${id}`,
    data: {},
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};

export const createPlantcare = ({
  data,
  headers,
  onSuccessHandler,
  onErrorHandler,
  onFinishHandler
}) => {
  const params = {
    method: 'POST',
    url: 'plantcares',
    data,
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};

export const updatePlantcare = ({
  data,
  headers,
  onSuccessHandler,
  onErrorHandler,
  onFinishHandler
}) => {
  const params = {
    method: 'PUT',
    url: `plantcares/${data.id}`,
    data,
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};

export const deletePlantcare = ({
  id,
  headers,
  onSuccessHandler,
  onErrorHandler,
  onFinishHandler
}) => {
  const params = {
    method: 'DELETE',
    url: `plantcares/${id}`,
    data: {},
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};
