var hashTrack = angular.module('hashTrack', ['ngRoute']);

hashTrack.config(function($routeProvider) {
	$routeProvider.when('/', {
    	controller: 'SearchController',
    	templateUrl: 'views/search.html'
  }).when('/login', {
    	controller: 'LoginController',
    	templateUrl: 'views/Login.html'
  }).otherwise({
    redirectTo: '/'
  });
});
