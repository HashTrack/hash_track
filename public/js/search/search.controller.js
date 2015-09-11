hashTrack.controller('SearchController', ['$scope', '$location', function($scope, $location) {

  $scope.searchHashtag = function(hashtags) {
  	var hashtagsArray = hashtags.split(',');
  	var cleanHashTags = [];
  	hashtagsArray.forEach(function(item) {
  		cleanHashTags.push(item.replace(/ /g, ''));
  	});
  	
  	$location.search({q: cleanHashTags});
  	$location.path('/results');
  };
}]);
