'use strict';

angular.module('mean.googleform', ['lk-google-picker', 'angularMoment', 'youtube-embed'])

.config(['lkGoogleSettingsProvider', function(lkGoogleSettingsProvider) {

  // Configure the API credentials here
  lkGoogleSettingsProvider.configure({
    apiKey   : 'AIzaSyAi7ftauy3i2UoXMzyKHyLGHauTPLdQrPo',
    clientId : '1098461962064-0j8a2l937giqdgffedp4lduspp6gqesc.apps.googleusercontent.com'
  });
}])

.filter('getExtension', function() {
  return function(url) {
    return url.split('.').pop();
  };
})

.constant('angularMomentConfig', {
   // preprocess: 'unix', // optional
   // timezone: 'Europe/London', // optional
    
})

.controller('ExampleCtrl', ['$scope', 'lkGoogleSettings', function($scope, lkGoogleSettings) {
  $scope.files     = [];
  $scope.languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
  ]

  // Check for the current language depending on lkGoogleSettings.locale
  $scope.initialize = function() {
    angular.forEach($scope.languages, function(language, index) {
      if (lkGoogleSettings.locale === language.code) {
        $scope.selectedLocale = $scope.languages[index];
      }
    });
  }

  // Define the locale to use
  $scope.changeLocale = function(locale) {
    lkGoogleSettings.locale = locale.code;
  }
}]);