export const httpProviderConfig = ['$httpProvider', ($httpProvider) => {
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('requestLogger');
}];
