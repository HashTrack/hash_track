hashTrack.controller('SearchController', ['$scope', '$location', function($scope, $location) {

  $scope.searchHashtag = function(hashtag) {
    $scope.hashtag = hashtag;
    $scope.newURL = ('/results/' + $scope.hashtag)
    console.log('Sending you a tasty view at route : #/results/' + hashtag);
    $location.path($scope.newURL);
  };

}]);
