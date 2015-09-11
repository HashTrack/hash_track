hashTrack.controller('TrackController', ['$scope', '$http', 'track', 'authentication', '$location', function($scope, $http, track, authentication, $location) {

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
  }
];

$scope.clickAndTrackHashtag = function (hashtag, userCount, tweetCount) {
  var currentUser = authentication.currentUser._id;
  var currentHashtag = hashtag;
  var currentUserCount = userCount;
  var currentTweetCount = tweetCount;
  // console.log(currentUser);
  // console.log(currentHashtag);
  // console.log(currentUserCount);
  // console.log(currentTweetCount);


};
}]);
