hashTrack.controller('ResultsController', ['$scope', 'searchNoGeo', '$routeParams', function($scope, searchNoGeo,$routeParams) {
  console.log('Results Controler has the following Object.');
  $scope.hashtagsToSearch = $routeParams.q;
  $scope.apps = [];



  $scope.user_spinner = false;
  $scope.tweet_spinner = false;

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

   for (hashtag in $scope.hashtagsToSearch) {
    index = hashtag;
    $scope.apps.push({
      hashtag: $scope.hashtagsToSearch[hashtag],
      users: '',
      tweets: ''
    });
    $scope.getDataNoGeo($scope.hashtagsToSearch[hashtag], index, $scope.grabUniqueTweets, $scope.grabUniqueUsers);
  };


}]);
