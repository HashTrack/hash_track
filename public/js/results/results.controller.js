hashTrack.controller('ResultsController', ['$scope', 'results', function($scope, results) {
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
]
}]);
