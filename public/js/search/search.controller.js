hashTrack.controller('SearchController', ['$scope', function($scope) {
  $scope.searchHashtag = function(hashtag) {
    $scope.hashtag = hashtag;
    console.log('This thing needs to route corectly and its searching for hashtag: #' + hashtag);
  };

}]);
