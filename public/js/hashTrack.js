var hashTrack = angular.module('hashTrack', ['ngRoute']);

hashTrack.config(function($routeProvider) {	
	$routeProvider.when('/', {
    	controller: 'SearchController',
    	templateUrl: 'js/search/search.view.html'
  }).when('/login', {
    	controller: 'LoginController',
    	templateUrl: 'js/login/login.view.html'
  }).when('/results', {
    	controller: 'ResultsController',
    	templateUrl: 'js/results/results.view.html'
  }).when('/track', {
    	controller: 'TrackController',
    	templateUrl: 'js/track/track.view.html'
  }).when('/tweets', {
    	controller: 'TweetsController',
    	templateUrl: 'js/track/tweets.view.html'
  }).otherwise({
    redirectTo: '/'
  });
});
