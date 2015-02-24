'use strict';

angular.module('mean.googleform').controller('GoogleformController', ['$scope', 'Global', 'Googleform', 'lkGoogleSettings',
  function($scope, Global, Googleform, lkGoogleSettings) {
    $scope.global = Global;
    $scope.package = {
      name: 'googleform'
    };
    $scope.files = [];
    $scope.images =[];

    
  }
]);
