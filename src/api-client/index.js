import axios from 'axios';

const getErrorDetails = (error) => {
  let responseMessage;
  let responseErrors;

  if (error.response && error.response.status === 422) {
    responseMessage = error.response.data.message;
    responseErrors = error.response.data.errors;
  } else {
    const message = (error.response && error.response.statusText) || error.message;
    responseMessage = `HTTP error: ${message}`;
  }

  return { responseMessage, responseErrors };
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
      const errorDetails = getErrorDetails(error);
      onErrorHandler(errorDetails);
    })
    .finally(function () {
      onFinishHandler();
    });
};

export default httpRequest;
