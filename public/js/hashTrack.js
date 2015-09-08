var hashTrack = angular.module('hashTrack', ['ngRoute']);

hashTrack.config(function($routeProvider) {
	$routeProvider.when('/', {
    	controller: 'SearchController',
    	templateUrl: 'views/search.html'
  }).otherwise({
    redirectTo: '/'
  });
});
