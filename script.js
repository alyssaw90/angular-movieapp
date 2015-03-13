var moviesApp = angular.module('MoviesApp', ['ui.bootstrap', 'ngMessages', 'ngRoute'])

moviesApp.controller('SearchController', ['$scope', '$http', function($scope,$http){

  $scope.movies={}
  $scope.searchTerm = '';
  $scope.loading = false;
  $scope.searchTerms = [];

}]);

moviesApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/search.html',
      controller: 'SearchController'
    })

}]);
