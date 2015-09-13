hashTrack.controller('ResultsController', ['$scope', '$location', 'authentication', 'track', 'searchNoGeo', '$routeParams', function($scope, $location, authentication, track, searchNoGeo,$routeParams) {
  console.log('Results Controler has the following Object.');
  $scope.hashtagsToSearch = $routeParams.q;
  $scope.apps = [];

  $scope.getDataNoGeo = function (hashtag, index, callback_1, callback_2) {
    $scope.hashtagData = {};
    searchNoGeo.getTweets(hashtag)
      .success(function(data) {
        callback_1(data, index);
        callback_2(data, index);
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
    $scope.apps[index].users = $scope.dataCounter(data, 'user.screen_name');
  };

  $scope.grabUniqueTweets = function (data, index) {
    $scope.apps[index].ajax.tweet = false;
    $scope.apps[index].tweets = $scope.dataCounter(data, 'text');
  };

  var clickAndTrackHashtag = function (hashtag, userCount, tweetCount, index) {
    if (!authentication.isLoggedIn()) {
      $location.path('/login');
    } else {
      var currentUser = authentication.currentUser()._id;
      var currentHashtag = hashtag;
      var currentUserCount = userCount;
      var currentTweetCount = tweetCount;
      // make the post request
      track.trackHashtag(currentHashtag, currentUserCount, currentTweetCount, currentUser);
      $scope.apps[index].tracked = true;
      $scope.apps[index].trackButtonText = 'Tracked';
      $scope.apps[index].isDisabled = true;      
    }
  };

var viewTweets = function(hashtag) {
  $location.search({h: hashtag});
  $location.path('/tweets');
}

$scope.processHashTags = function() {  
   for (hashtag in $scope.hashtagsToSearch) {
    var tracked = trackedHashTags.indexOf($scope.hashtagsToSearch[hashtag]) === -1 ? false : true;
    var button = tracked ? 'Tracking' : 'Track';
    index = hashtag;
    $scope.apps.push({
      i: index,
      hashtag: $scope.hashtagsToSearch[hashtag],
      tracked: tracked,
      users: '',
      tweets: '',
      ajax: { user: true, tweet: true },
      track: clickAndTrackHashtag,
      viewTweets: viewTweets,
      trackButtonText: button,
      isDisabled: tracked
    });
    $scope.getDataNoGeo($scope.hashtagsToSearch[hashtag], index, $scope.grabUniqueTweets, $scope.grabUniqueUsers);
  };
};

//check to see if any of the saerched hash tags are already tracked
var trackedHashTags = [];
if (authentication.isLoggedIn()) {
  track.getTrackedHashTags(authentication.currentUser()._id, function(error, data) {
    if (error) return error;
    data.data.forEach(function(item) {
      if (item.tracked) trackedHashTags.push(item.name);
    });
    $scope.processHashTags();
    console.log($scope.apps);
  });
} else {
    $scope.processHashTags();
    console.log($scope.apps);
}


}]); //end of the controller
