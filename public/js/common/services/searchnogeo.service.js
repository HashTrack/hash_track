hashTrack.factory('searchNoGeo', ['$http', function($http) {
  var getTweets = function(hashtag, since) {
    console.log(hashtag);
    var newURL= '/api/twitter/search/' + hashtag + '/' + since + '/';
    console.log('searching for ' + newURL);
    return $http.get(newURL);
  }
  return { getTweets: getTweets };
}]);
