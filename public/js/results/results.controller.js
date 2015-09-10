hashTrack.controller('ResultsController', ['$scope', 'searchNoGeo', '$routeParams', function($scope, searchNoGeo,$routeParams) {
  $scope.apps = [{
    hashtag: '#pizza',
    users: 14,
    tweets: 18
    },
    {
    hashtag: '#burgers',
    users: 9,
    tweets: 14
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

  $scope.getDataNoGeo();

}]);
