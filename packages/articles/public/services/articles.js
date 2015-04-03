'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.articles').factory('Articles', ['$resource',
  function($resource) {
    return $resource('articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
])

// service to get google document key and share between different controllers via indepency injection
.service('shareDataService', function() {
  var key = '';

  var setKey = function(newObj) {
      key = newObj;
  }

  var getKey = function(){
      return key;
  }

  return {
    setKey: setKey,
    getKey: getKey
  }

});
