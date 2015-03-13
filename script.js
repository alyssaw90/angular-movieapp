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

    if($scope.searchTerm.length < 1){
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

moviesApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/search.html',
      controller: 'SearchController'
    })

}]);
