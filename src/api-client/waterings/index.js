import * as ApiClient from '..';
import snakecaseKeys from 'snakecase-keys';

export const getWaterings = ({ headers, onSuccessHandler, onErrorHandler, onFinishHandler }) => {
  const params = {
    method: 'GET',
    url: 'waterings',
    data: {},
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};

export const getWatering = ({ id, headers, onSuccessHandler, onErrorHandler, onFinishHandler }) => {
  const params = {
    method: 'GET',
    url: `waterings/${id}`,
    data: {},
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};

export const createWatering = ({
  data,
  headers,
  onSuccessHandler,
  onErrorHandler,
  onFinishHandler
}) => {
  const requestParams = snakecaseKeys(data);
  const params = {
    method: 'POST',
    url: 'waterings',
    data: requestParams,
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};

export const updateWatering = ({
  data,
  headers,
  onSuccessHandler,
  onErrorHandler,
  onFinishHandler
}) => {
  const requestParams = snakecaseKeys(data);
  const params = {
    method: 'PUT',
    url: `waterings/${data.id}`,
    data: requestParams,
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};

export const deleteWatering = ({
  id,
  headers,
  onSuccessHandler,
  onErrorHandler,
  onFinishHandler
}) => {
  const params = {
    method: 'DELETE',
    url: `waterings/${id}`,
    data: {},
    headers,
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler
  };

  ApiClient.httpRequest(params);
};
