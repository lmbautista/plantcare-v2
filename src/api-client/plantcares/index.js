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
