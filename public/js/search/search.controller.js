hashTrack.controller('SearchController', ['$scope', '$location', function($scope, $location) {
  // john, gene ralph,peter ronald

  $scope.searchHashtag = function(hashtags) {
  	var clean = hashtags.replace(/[\s,]+/g, ',');
    cleanHashTags = clean.split(',');
  	
  	$location.search({q: cleanHashTags});
  	$location.path('/results');
  };

  $scope.setSearchFocus = function(className) {
  	document.getElementById(className).focus();
  }

}]);
