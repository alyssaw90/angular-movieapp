var moviesApp = angular.module('MoviesApp', ['ui.bootstrap', 'ngMessages', 'ngRoute'])

moviesApp.controller('SearchController', ['$scope', '$http', function($scope,$http){

  $scope.movies={}
  $scope.searchTerm = '';
  $scope.loading = false;
  $scope.searchTerms = [];

  try {
    $scope.searchTerms = JSON.parse(window.localStorage.searchTerms) || [];
  } catch(e){
    console.log('error', e);
    $scope.searchTerms = [];
  }

  $scope.search = function(){
    $scope.loading = true;

    if($scope.searchTerm.length < 2){
      $scope.movies.Error = "Must provide more than one character"
      return;
    }

    var req = {
      url: 'http://www.omdbapi.com',
      params: {
        s: $scope.searchTerm,
        type: $scope.searchType
      }
    }

    window.localStorage.searchTerms = JSON.stringify($scope.searchTerms);

    $http(req).success(function(data){
      if($scope.searchTerms.indexOf($scope.searchTerm) === -1){
        $scope.searchTerms.push($scope.searchTerm);
      }
      $scope.movies = data;
      $scope.loading = false
    });
  }

  if($scope.searchTerm){
    $scope.search();
  }
}]);

moviesApp.controller('DetailsController', ['$scope','$http','$routeParams', function($scope,$http,$routeParams){

  var req = {
    url: 'http://www.omdbapi.com',
    params: {
      i: $routeParams.id
    }
  }

  $http(req).success(function(data){
    $scope.movies = data
  });

}]);

moviesApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/search.html',
      controller: 'SearchController'
    })
    .when('/movies/:id', {
      templateUrl: '/movie.html',
      controller: 'DetailsController'
    })

    $locationProvider.hashPrefix('!');

}]);
