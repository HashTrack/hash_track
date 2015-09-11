hashTrack.controller('SearchController', ['$scope', '$location', function($scope, $location) {

  $scope.searchHashtag = function(hashtags) {
  	hashtags = hashtags.split(',');
  	console.log(typeof hashtags);
    var hashTagQuery = '';
    hashtags.forEach(function(hashtag) {
    	hashTagQuery += 'h=' + hashtag.replace(/\s/g, '') + '&';
    });
    hashTagQuery = hashTagQuery.substring(0, hashTagQuery.length - 1);
    $scope.newQuery = (hashTagQuery);
    console.log('Sending you a tasty new URL : ' + $scope.newQuery);
    $location.search($scope.newQuery);
    $location.path('/results');
  };

}]);
