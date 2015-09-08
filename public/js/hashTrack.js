var hashTrack = angular.module('hashTrack', ['ngRoute']);

hashTrack.config(function($routeProvider) {
	$routeProvider.when('/', {
    	controller: 'HomeController',
    	templateUrl: 'views/home.html'
  }).otherwise({
    redirectTo: '/'
  });
});
