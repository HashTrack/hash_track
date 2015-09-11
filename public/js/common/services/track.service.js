hashTrack.factory('track', ['$http', function($http) {

  var getToken = function () {
    return authentication.getToken();
  };

  var trackHashtag = function (hashtag, userCount, tweetCount, userId) {
    var token = getToken();
    console.log(token);
    $httpProvider.defaults.headers.common.Authorization = "Bearer " + token.hashTrack-token;

    $http.post('/api/hashtag', {
      name:hashtag,
      user:userId,
      tracked:true,
      user_count:userCount,
      tweet_count:tweetCount
    }).error(function (e, content) {
      if (e) return content;
    }).then( function (data) {
      console.log(data);
      return data;
    });

};

  return { trackHashtag: trackHashtag };
}]);
