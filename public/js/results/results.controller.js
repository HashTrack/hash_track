hashTrack.controller('ResultsController', ['$scope', 'searchNoGeo', '$routeParams', function($scope, searchNoGeo,$routeParams) {
  $scope.apps = [{
    hashtag: $routeParams.hashtag,
    users: 14,
    tweets: 18
    }
  ];

  $scope.getDataNoGeo = function () {
    $scope.hashtagData = {};
    searchNoGeo.getTweets($routeParams.hashtag)
      .success(function(data) {
        $scope.hashtagData = data
      })
      .error(function (e) {
        console.log('You goofed somewhere...');
  })};

  $scope.grabUniqueUsers = function (data) {
    
  };

  $scope.grabUniqieTweets = function (data) {

  };


  $scope.getDataNoGeo();
  // $scope.grabUniqieTweets($scope.hashtagData);
  // $scope.grabUniqueUsers($scope.hashtagData);

}]);
