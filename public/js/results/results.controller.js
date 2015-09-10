hashTrack.controller('ResultsController', ['$scope', 'searchNoGeo', function($scope, searchNoGeo) {
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
    searchNoGeo.getTweets('pizza')
      .success(function(data) {
        $scope.hashtagData = data
        console.log($scope.hashtagData);
      })
      .error(function (e) {
        console.log('oopps');
      })};

  $scope.getDataNoGeo();

}]);
