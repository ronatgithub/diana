'use strict';

angular.module('mean.googleform').factory('Googleform', [
  function() {
    return {
      name: 'googleform'
    };
  }
])

.factory('myService', function($http) {
   return {
        getFoos: function(key) {
             //return the promise directly.
             return $http.get('https://docs.google.com/document/d/' + key + '/pub')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        }
   }
});