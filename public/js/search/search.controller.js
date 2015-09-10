hashTrack.controller('SearchController', ['$scope', function($scope, $location) {
  $scope.searchHashtag = function(hashtag) {
    $scope.hashtag = hashtag;
    $location.url('#/results');
    console.log('This thing needs to route corectly and its searching for hashtag: #' + hashtag);

  };

}]);
