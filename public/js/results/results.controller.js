hashTrack.controller('ResultsController', ['$scope', 'searchNoGeo', '$routeParams', function($scope, searchNoGeo,$routeParams) {
  $scope.apps = [{
    hashtag: $routeParams.hashtag,
    users: '',
    tweets: ''
  }
  ];

  $scope.getDataNoGeo = function (callback_1, callback_2) {
    $scope.hashtagData = {};
    searchNoGeo.getTweets($routeParams.hashtag)
      .success(function(data) {
        callback_1(data);
        callback_2(data);
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

  $scope.grabUniqueUsers = function (data) {
    $scope.apps[0].users = $scope.dataCounter(data, 'user.screen_name');
  };

  $scope.grabUniqueTweets = function (data) {
    $scope.apps[0].tweets = $scope.dataCounter(data, 'text');
  };

  $scope.getDataNoGeo($scope.grabUniqueTweets, $scope.grabUniqueUsers);

}]);
