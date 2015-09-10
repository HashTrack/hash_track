hashTrack.controller('SearchController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.searchHashtag = function(hashtag) {
    $scope.hashtag = hashtag;
    $scope.newURL = ('/results/' + $scope.hashtag)
    console.log($scope.newURL);
    console.log('This thing needs to route corectly and its searching for hashtag: #' + hashtag);
    $location.path($scope.newURL);
  };

}]);
