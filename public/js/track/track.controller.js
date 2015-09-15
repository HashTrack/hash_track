hashTrack.controller('TrackController', ['$scope', '$http', 'track', 'searchNoGeo', 'authentication', '$location', function($scope, $http, track, searchNoGeo, authentication, $location) {

if (!authentication.isLoggedIn()) {
  $location.path('/login')
}
$scope.apps = [];

track.getTrackedHashTags(authentication.currentUser()._id, function(error, data) {
  if (error) return error;
  if (data.data.length === 0) {
    $scope.message = 'You do not have any tracked hashtags'
  } else {
    $scope.message = '';
  }
  $scope.hashTagsToSearch = [];
  $scope.processHashTags(data.data);
});

var viewTweets = function(hashtag) {
  $location.search({h: hashtag});
  $location.path('/tweets');
}

$scope.getDataNoGeo = function (hashtag, index, since, callback_1, callback_2) {
  $scope.hashtagData = {};
  searchNoGeo.getTweets(hashtag, since)
    .success(function(data) {
      callback_1(data, index);
      callback_2(data, index);
      if (data.tweets.length === 100) {
        console.log('executing additional calls to Twitter');
        $scope.getDataNoGeo(hashtag, index, data.highest_id, callback_1, callback_2);
      }
    })
    .error(function (error) {
      return error;
    });
};

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
  $scope.apps[index].ajax.user = false;
  $scope.apps[index].last_tweet_id = $scope.apps[index].last_tweet_id ? $scope.apps[index].last_tweet_id : data.lowest_id;
  $scope.apps[index].users += $scope.dataCounter(data.tweets, 'user.screen_name');
};

$scope.grabUniqueTweets = function (data, index) {
  $scope.apps[index].ajax.tweet = false;
  $scope.apps[index].last_tweet_id = $scope.apps[index].last_tweet_id ? $scope.apps[index].last_tweet_id : data.lowest_id;
  $scope.apps[index].tweets += $scope.dataCounter(data.tweets, 'text');
};

$scope.processHashTags = function(hashtags) {
  for (hashtag in hashtags) {
    index = hashtag;
    $scope.apps.push({
      hashtag: hashtags[hashtag].name,
      users: 0,
      tweets: 0,
      tracked: hashtags[hashtag].tracked,
      track: $scope.clickAndTrackHashtag,
      last_tweet_id: hashtags[hashtag].last_tweet_id,
      ajax: { user: true, tweet: true },
      viewTweets: viewTweets,
      message: ''
    });
    $scope.getDataNoGeo(hashtags[hashtag].name, index, hashtags[hashtag].last_tweet_id, $scope.grabUniqueTweets, $scope.grabUniqueUsers);
  };
};

$scope.clickAndTrackHashtag = function (hashtag, latest_id, i) {
  var currentUser = authentication.currentUser._id;
  var currentHashtag = hashtag;
  var currentUserCount = userCount;
  var currentTweetCount = tweetCount;
  var currentLatestId = latest_id;
  // make the post request
  track.trackHashtag(currentHashtag, currentLatestId, currentUser);
};
}]);
