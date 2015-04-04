'use strict';

angular.module('mean.googleform', ['lk-google-picker', 'angularMoment', 'youtube-embed', 'angular-loading-bar', 'ui.bootstrap'])

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

.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}])

.constant('angularMomentConfig', {
   // preprocess: 'unix', // optional
   // timezone: 'Europe/London', // optional
    
})

//.run(['$window', '$rootScope', function($window, $rootScope) {
//
//  $rootScope.$on('$viewContentLoaded', function(){
//
//    var interval = setInterval(function(){
//      if (document.readyState == "complete") {
//          window.scrollTo(0, 0);
//          clearInterval(interval);
//      }
//    },200);
//  });
//
//}])

// using a service .factory to get content of published google doc via ajax request
.controller('googleDocCtrl', function($scope, myService, shareDataService) {
  // using a .service (shareDataService) in article directory to get google document key
  $scope.setKey = shareDataService.getKey();
    myService.getFoos($scope.setKey).then(function(foos) {
        $scope.foos = foos; // responses from ajax request

        var el = document.createElement( 'div' );
        el.innerHTML = foos;
        var doc = el.querySelector('#contents'); 
        doc.removeChild(doc.lastChild);
        doc.removeChild(doc.firstChild);
        doc.removeChild(doc.firstChild);

    var domToString = doc.innerHTML;
    $scope.googleDocContent = domToString;

    });
})

.controller('ModalGoogleDocCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'ModalGoogleDocContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: 'static',
      keyboard: true,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
})

.controller('ModalCatalogOrderCtrl', function ($scope, $modal, $log) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'ModalCatalogOrderContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: 'static',
      keyboard: true,
      resolve: {}
    });

    modalInstance.result.then(function (selectedItem) {
      
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
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