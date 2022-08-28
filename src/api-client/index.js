import axios from 'axios';

const getErrorMessage = (error) => {
  let errorMessage;

  if (error.response && error.response.status === 422) {
    errorMessage = error.response.data.message;
  } else {
    const message = (error.response && error.response.statusText) || error.message;
    errorMessage = `HTTP error: ${message}`;
  }

  return errorMessage;
};

const httpClient = axios.create({
  baseURL: 'http://dev.api.yourplantcare.com/v1',
  timeout: 5000
});

export const httpRequest = (params) => {
  const {
    method,
    url,
    headers,
    data = {},
    onSuccessHandler,
    onErrorHandler,
    onFinishHandler = () => {}
  } = params;

  httpClient
    .request({ method, url, data, headers })
    .then(function (response) {
      onSuccessHandler(response.data);
    })
    .catch(function (error) {
      const errorMessage = getErrorMessage(error);
      onErrorHandler(errorMessage);
    })
    .finally(function () {
      onFinishHandler();
    });
};

export default httpRequest;
