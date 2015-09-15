hashTrack.controller('ResultsController', ['$scope', '$location', 'authentication', 'track', 'searchNoGeo', '$routeParams', function($scope, $location, authentication, track, searchNoGeo,$routeParams) {
  console.log('Results Controler has the following Object.');
  $scope.hashtagsToSearch = $routeParams.q;
  if (typeof $scope.hashtagsToSearch === 'string') {
    $scope.hashtagsToSearch = JSON.parse('["' + $scope.hashtagsToSearch + '"]');
  };
  $scope.apps = [];

  $scope.getDataNoGeo = function (hashtag, index, since, callback_1, callback_2) {
    $scope.hashtagData = {};
    searchNoGeo.getTweets(hashtag, since)
      .success(function(data) {
        console.log('raw count from Twitter for: ' + hashtag + ' is ' + data.tweets.length);
        callback_1(data, index);
        callback_2(data, index);
        if (data.tweets.length === 100) {
          console.log('executing additional calls to Twitter for ' + hashtag);
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
    console.log('$scope.apps[' + index + '].last_tweet_id = ' + $scope.apps[index].last_tweet_id);
    $scope.apps[index].tweets += $scope.dataCounter(data.tweets, 'text');
  };

  var clickAndTrackHashtag = function (hashtag, last_id, i) {
    if (!authentication.isLoggedIn()) {
      $location.path('/login');
    } else {
      var currentUser = authentication.currentUser()._id;
      var currentHashtag = hashtag;
      var currentLastTweetId = last_id;
      // make the post request
      track.trackHashtag(currentHashtag, currentLastTweetId, currentUser);
      $scope.apps[i].tracked = true;
      $scope.apps[i].trackButtonText = 'Tracked';
      $scope.apps[i].isDisabled = true;
    }
  };

var viewTweets = function(hashtag) {
  $location.search({h: hashtag});
  $location.path('/tweets');
}

$scope.processHashTags = function() {
  for (hashtag in $scope.hashtagsToSearch) {
    var latest_id;
    var trackedHashTagNames = trackedHashTags.map(function(item) { return item.name });
    var foundTrackedHashTag = trackedHashTagNames.indexOf($scope.hashtagsToSearch[hashtag])
    if (foundTrackedHashTag === -1) {
      tracked = false;
    } else {
      tracked = true;
      latest_id = trackedHashTags[foundTrackedHashTag].last_tweet_id
    }
    var button = tracked ? 'Tracking' : 'Track';
    index = hashtag;
    $scope.apps.push({
      i: index,
      hashtag: $scope.hashtagsToSearch[hashtag],
      tracked: tracked,
      users: 0,
      last_tweet_id: latest_id,
      tweets: 0,
      ajax: { user: true, tweet: true },
      track: clickAndTrackHashtag,
      viewTweets: viewTweets,
      trackButtonText: button,
      isDisabled: tracked
    });
    console.log($scope.apps);
    $scope.getDataNoGeo($scope.hashtagsToSearch[hashtag], index, latest_id, $scope.grabUniqueTweets, $scope.grabUniqueUsers);
  };
};

//check to see if any of the saerched hash tags are already tracked
var trackedHashTags = [];
if (authentication.isLoggedIn()) {
  track.getTrackedHashTags(authentication.currentUser()._id, function(error, data) {
    if (error) return error;
    data.forEach(function(item) {
      if (item.tracked) trackedHashTags.push({ name: item.name, last_tweet_id: item.last_tweet_id });
    });
    $scope.processHashTags();
  });
} else {
    $scope.processHashTags();
}


}]); //end of the controller
