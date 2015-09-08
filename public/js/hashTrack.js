var hashTrack = angular.module('hashTrack', ['ngRoute']);

hashTrack.config(function($routeProvider) {
	$routeProvider.when('/', {
    	controller: 'SearchController',
    	templateUrl: 'views/search.html'
  }).when('/login', {
    	controller: 'LoginController',
    	templateUrl: 'views/Login.html'
  }).when('/results', {
    	controller: 'ResultsController',
    	templateUrl: 'views/results.html'
  }).when('/track', {
    	controller: 'TrackController',
    	templateUrl: 'views/track.html'
  }).when('/tweets', {
    	controller: 'TweetsController',
    	templateUrl: 'views/tweets.html'
  }).otherwise({
    redirectTo: '/'
  });
});
