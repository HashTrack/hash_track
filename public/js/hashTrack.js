var hashTrack = angular.module('hashTrack', ['ngRoute', 'uiGmapgoogle-maps']);

Array.prototype.clean = function(value) {
  for (i=0; i<this.length; i++) {
    if (this[i] == value) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
}

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
    	templateUrl: 'js/tweets/tweets.view.html'
  }).otherwise({
    redirectTo: '/'
  });
});
