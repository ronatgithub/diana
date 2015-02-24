'use strict';

angular.module('mean.googleform').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('googleform example page', {
      url: '/googleform/example',
      templateUrl: 'googleform/views/index.html'
    });
  }
]);
