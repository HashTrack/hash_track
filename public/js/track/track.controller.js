hashTrack.controller('TrackController', ['$scope', '$http', 'track', 'searchNoGeo', 'authentication', '$location', function($scope, $http, track, searchNoGeo, authentication, $location) {

if (!authentication.isLoggedIn()) {
  $location.path('/login')
}
// test data
// $scope.apps = [{
//   hashtag: '#meanstack',
//   users: 14,
//   tweets: 18,
//   tracked: true
//   },
//   {
//   hashtag: '#javascript',
//   users: 9,
//   tweets: 14,
//   tracked: false
//   }
// ];

$scope.user_spinner = false;
$scope.tweet_spinner = false;
$scope.apps = [];

track.getTrackedHashTags(authentication.currentUser()._id, function(error, data) {
  if (error) console.log(error);
  console.log('in the gettrcked callback');
  console.log(data);
  $scope.hashTagsToSearch = [];
  $scope.processHashTags(data.data);
  console.log($scope.apps);
});

$scope.getDataNoGeo = function (hashtag, index, callback_1, callback_2) {
  $scope.hashtagData = {};
  $scope.user_spinner = true;
  $scope.tweet_spinner = true;
  searchNoGeo.getTweets(hashtag)
    .success(function(data) {
      callback_1(data, index);
      callback_2(data, index);
    })
    .error(function (e) {
      console.log('You goofed somewhere...');

})};

$scope.dataCounter = function (data, dataToEvaluate) {
  var uniqueData = [], keys = dataToEvaluate.split('.'), i, l, j, k, dataToCount;
  for (i = 0, l = data.length; i<l; i++){
    dataToCount = data[i];
    for (j = 0, k = keys.length; j<k; j++) {
      dataToCount = dataToCount[keys[j]];
    };
    if (uniqueData.indexOf(dataToCount) === -1)  {
      uniqueData.push(dataToCount);
    };
  };
  return uniqueData.length;
};

$scope.grabUniqueUsers = function (data, index) {
  $scope.user_spinner = false;
  $scope.apps[index].users = $scope.dataCounter(data, 'user.screen_name');
};

$scope.grabUniqueTweets = function (data, index) {
  $scope.tweet_spinner = false;
  $scope.apps[index].tweets = $scope.dataCounter(data, 'text');
};

$scope.processHashTags = function(hashtags) {
  console.log('data.data looks like: ');
  for (hashtag in hashtags) {
    index = hashtag;
    $scope.apps.push({
      hashtag: hashtags[hashtag].name,
      users: '',
      tweets: '',
      tracked: hashtags[hashtag].tracked
    });
    $scope.getDataNoGeo(hashtags[hashtag], index, $scope.grabUniqueTweets, $scope.grabUniqueUsers);
  };
};



$scope.clickAndTrackHashtag = function (hashtag, userCount, tweetCount) {
  var currentUser = authentication.currentUser._id;
  var currentHashtag = hashtag;
  var currentUserCount = userCount;
  var currentTweetCount = tweetCount;
  console.log(currentUser);
  console.log(currentHashtag);
  console.log(currentUserCount);
  console.log(currentTweetCount);
  // make the post request
  track.trackHashtag(currentHashtag, currentUserCount, currentTweetCount, currentUser);
};
}]);
