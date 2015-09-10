hashTrack.controller('SearchController', ['$scope', function($scope, $location) {
  $scope.searchHashtag = function(hashtag) {
    $scope.hashtag = hashtag;
    var path = $location.path('/results');
    console.log('this works' + hashtag);
  };

}]);
