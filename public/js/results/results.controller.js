hashTrack.controller('ResultsController', ['$scope', 'searchNoGeo', '$routeParams', function($scope, searchNoGeo,$routeParams) {
  $scope.apps = [{
    hashtag: $routeParams.hashtag,
    users: $scope.uniqueUsers,
    tweets: 18
  }
  ];

  $scope.user_spinner = false;
  $scope.tweet_spinner = false;

  $scope.getDataNoGeo = function (callback_1, callback_2) {
    $scope.hashtagData = {};
    $scope.user_spinner = true;
    $scope.tweet_spinner = true;
    searchNoGeo.getTweets($routeParams.hashtag)
      .success(function(data) {
        callback_1(data);
        callback_2(data);
      })
      .error(function (e) {
        console.log('You goofed somewhere...');

  })};

  $scope.grabUniqueUsers = function (data) {
    var uniqueData = [], i, l, screenName;
    for (i = 0, l = data.length; i<l; i++){
      screenName = data[i].user.screen_name
      if (uniqueData.indexOf(screenName) === -1)  {
        uniqueData.push(screenName);
      };
    }
    $scope.user_spinner = false;
    $scope.apps[0].users = uniqueData.length;
    console.log(uniqueData.length);


  };

  $scope.grabUniqueTweets = function (data) {
    console.log('-------------');
    console.log('tweets function');
    console.log('-------------');
  };


  $scope.getDataNoGeo($scope.grabUniqueUsers, $scope.grabUniqueTweets);




}]);
