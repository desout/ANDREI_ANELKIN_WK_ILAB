export const translateProviderConfig = ['$translateProvider', ($translateProvider) => {
  const enConfig = require('../../assets/i18n/en.json');
  $translateProvider.translations('en', enConfig);
  const ruConfig = require('../../assets/i18n/ru.json');
  $translateProvider.translations('ru', ruConfig);
  $translateProvider.preferredLanguage('ru');
  $translateProvider.registerAvailableLanguageKeys(['en', 'ru']);
  $translateProvider.useSanitizeValueStrategy('escape');
}];
