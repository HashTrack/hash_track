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
    var json = data, i, l;
    console.log('data in unique function');
    console.log(json);
  };

  $scope.grabUniqieTweets = function (data) {

  };


  $scope.getDataNoGeo();
  $scope.grabUniqueUsers($scope.hashtagData);
  // $scope.grabUniqieTweets($scope.hashtagData);


}]);
