hashTrack.controller('ResultsController', ['$scope', 'searchNoGeo', '$routeParams', function($scope, searchNoGeo,$routeParams) {
  $scope.apps = [{
    hashtag: $routeParams.hashtag,
    users: 14,
    tweets: 18
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

  $scope.grabUniqueUsers = function (data) {
    var i, l;
    console.log(data[0]);


  };

  $scope.grabUniqueTweets = function (data) {
    console.log('-------------');
    console.log('tweets function');
    console.log('-------------');
  };


  $scope.getDataNoGeo($scope.grabUniqueUsers, $scope.grabUniqueTweets);




}]);
