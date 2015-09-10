hashTrack.controller('SearchController', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
  $scope.searchHashtag = function(hashtag) {
    $scope.hashtag = hashtag;
    console.log($routeParams);
    $scope.newURL = ('/results/' + $routeParams.hashtag)
    console.log($scope.newURL);

    console.log('This thing needs to route corectly and its searching for hashtag: #' + hashtag);
  };
    var path = $location.path($scope.newURL);
}]);
