hashTrack.factory('searchNoGeo', ['$http', function($http) {
  var getTweets = function(hashtag) {
    var newURL= '/api/twitter/search/' + hashtag + '/'
    console.log('searching for ' + newURL);
    return $http.get(newURL);
  }
  return { getTweets: getTweets };
}]);
