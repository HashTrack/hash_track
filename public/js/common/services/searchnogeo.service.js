hashTrack.factory('searchNoGeo', ['$http', function($http) {
  var getTweets = function(hashtag) {
    var newURL= 'http://127.0.0.1:5000/api/twitter/search/' + hashtag + '/'
    console.log('searching for ' + newURL);
    return $http.get(newURL);
  }
  return { getTweets: getTweets };
}]);
