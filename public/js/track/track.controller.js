hashTrack.controller('TrackController', ['$scope', '$http', 'authentication', '$location', function($scope, $http, authentication, $location) {
  
if (!authentication.isLoggedIn()) {
  $location.path('/login')
}



  // test data
  $scope.apps = [{
  hashtag: '#meanstack',
  users: 14,
  tweets: 18
  },
  {
  hashtag: '#javascript',
  users: 9,
  tweets: 14
  },
  {
  hashtag: '#rubybitches',
  users: 9,
  tweets: 14
  },
  {
  hashtag: '#eatrailsforbreakfast',
  users: 9,
  tweets: 14
  },
  {
  hashtag: '#jslife',
  users: 9,
  tweets: 14
  },
  {
  hashtag: '#makejavascript',
  users: 9,
  tweets: 14
  },
  {
  hashtag: '#rubylife2015',
  users: 9,
  tweets: 14
  }
]
}]);
