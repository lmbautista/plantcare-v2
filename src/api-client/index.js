import axios from 'axios';
import enLocale from './locales/en.js';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys-deep';

const getErrorCodeMessage = (error) => {
  const is5xxError = (errorCode) => errorCode.match(/5[0-9]{2}$/i) !== null;

  const errorCode = error.response.status.toString();
  const normalizedErrorCode = is5xxError(errorCode) ? '5xx' : errorCode;

  return enLocale.httpErrors[normalizedErrorCode];
};

const getErrorDetails = (error) => {
  let responseMessage;
  let responseErrors;
  if (error.response === undefined) {
    responseMessage = `HTTP error: ${error.message}`;
  } else if (error.response.status === 404) {
    responseMessage = error.response.statusText;
  } else if (error.response.status === 422) {
    responseMessage = error.response.data.message;
    responseErrors = error.response.data.errors;
  } else {
    responseMessage = [getErrorCodeMessage(error), error.response.statusText].join(': ');
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
  const normalizedData = snakecaseKeys(data);

  httpClient
    .request({ method, url, data: normalizedData, headers })
    .then(function (response) {
      onSuccessHandler(camelcaseKeys(response.data));
    })
    .catch(function (error) {
      const normalizedError = camelcaseKeys(error);
      const errorDetails = getErrorDetails(normalizedError);
      onErrorHandler(errorDetails);
    })
    .finally(function () {
      onFinishHandler();
    });
};

export default httpRequest;
