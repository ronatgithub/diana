'use strict';
/**
*Overriding views
You may override public views used by certain core packages. To create a custom home page, you would create a custom package and modify the script in it’s public folder like so:
angular.module('mean.mycustompackage', ['mean.system'])
.config(['$viewPathProvider', function($viewPathProvider) {
  $viewPathProvider.override('system/views/index.html', 'mycustompackage/views/myhomepage.html');
}]);
*/
angular.module('mean.articles', ['mean.system', 'mean.googleform'])
.config(['$viewPathProvider', function($viewPathProvider) {
  $viewPathProvider.override('system/views/index.html', 'articles/views/public-list.html');
}]).controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', 'shareDataService',
  function($scope, $stateParams, $location, Global, Articles, shareDataService) {
    $scope.global = Global;
    $scope.currentUser = $scope.global.user;

    $scope.date = new moment();
    
    var doc_id = '';

    $scope.fileSelected = function(files) {
      console.log(files);
      for(var key in files) {
        if(files.hasOwnProperty(key)) {
          var value = files[key];
          doc_id = value.id;
          $scope.doc_title = value.name;
          $scope.tourStartDate = moment(value.name.split("N")[0]).format('YYYY-MM-DD');         
          $scope.title = value.name.split("-")[3].split(",")[0];
          $scope.overnight = value.name.split("N")[1].split("-")[0].split("#")[0];
          $scope.price = value.name.split("#")[1].split("-")[0];
          $scope.content = value.description;
        }
      }
    };

    $scope.getCurrentOffer = function(user) {
      Articles.query(function(articles) {
          $scope.offers = user ? articles.filter(function(article) {
              return article.user._id === user._id;
          }) : articles;
      });
      
    };

    $scope.imagesSelected = function(images) {
      console.log(images);
      for(var key in images) {
        if(images.hasOwnProperty(key)) {
          var value = images[key];
          $scope.img = 'http://googledrive.com/host/' + value.parentId + '/' + value.name;
        }
      }
    };

    $scope.cancel = function () {
      $location.path('articles');
    };

    $scope.isPublished = function (article) {
      if(article.published === true){
        return true;
    }
    };

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
    };

    $scope.publish = function(article) {
         if (article) {
              article.published = !article.published;
              article.$update();
         }
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var article = new Articles({
          title: this.title,
          price: this.price,
          tourStartDate: this.tourStartDate,
          overnight: this.overnight,
          content: this.content,
          img: this.img,
          video: this.video,
          google: doc_id
        });
        article.$save(function(response) {
          $location.path('articles'); /*$location.path('articles/' + response._id);*/
        });

        this.title = '';
        this.price = '';
        this.tourStartDate = '';
        this.overnight = ''
        this.content = '';
        this.img = '';
        this.video ='';
        this.google = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove(function(response) {
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
	      $scope.articles.splice(i,1);
            }
          }
          $location.path('articles');
        });
      } else {
        $scope.article.$remove(function(response) {
          $location.path('articles');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var article = $scope.article;
        if (!article.updated) {
          article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
          $location.path('articles'); /*$location.path('articles/' + response._id);*/
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function(user) {
      Articles.query(function(articles) {
          $scope.articles = user ? articles.filter(function(article) {
              return article.user._id === user._id;
          }) : articles;
      });
    };

    $scope.findOne = function() {
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
        $scope.article = article;
        $scope.travelVideo = article.video;
        // get the google document key from article.google and send it to the .service (shareDataService)
        shareDataService.setKey(article.google);
      });
    };
  }
]);
