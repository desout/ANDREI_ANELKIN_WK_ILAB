import { LoggingService } from './loggingService';

export const requestLogging = (loggingService: LoggingService) =>{
  let startTime;
  return {
    request: function (config) {
      if (config.url.indexOf('html') == -1) {
        startTime = new Date().getTime();
        loggingService.log('HTTP',config.method + " request: " + config.url);
      }
      return config;
    },
    response: function (response) {
      if (response.config.url.indexOf('html') == -1) {
        const requestTime = new Date().getTime() - startTime;
        loggingService.log('HTTP',response.config.method + " response successful: " + response.config.url + " time: " + requestTime );

      }
      return response;
    },
    responseError: function (response) {
      if (response.config.url.indexOf('html') == -1) {
        const requestTime = new Date().getTime() - startTime;
        loggingService.log('HTTP',response.config.method + " response error: " + response.config.url + " time: " + requestTime );

      }
      return response;
    }
  };
};
