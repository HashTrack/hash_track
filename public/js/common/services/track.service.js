hashTrack.factory('track', ['$http', 'authentication', function($http, authentication) {

  var getToken = function () {
    return authentication.getToken();
  };

  var trackHashtag = function (hashtag, userCount, tweetCount, userId) {
    var token = getToken();
    $http.defaults.headers.common.Authorization = "Bearer " + token;
    $http.post('/api/hashtags', {
      name: hashtag,
      user: userId,
      tracked: true,
      user_count: userCount,
      tweet_count: tweetCount
    }).error(function (error, content) {
      console.log(error);
    }).then( function (data) {
      console.log(data);
      return data;
    });

  };

  var getTrackedHashTags = function(userId, callback) {
    console.log(userId);
    var token = getToken();
    $http.defaults.headers.common.Authorization = "Bearer " + token;
    $http.get('/api/hashtags/user/' + userId)
    .error(function(error) {
      callback(error, null);
    })    
    .then(function(data) {
      callback(null, data);
    });
  }

  return {
    trackHashtag: trackHashtag,
    getTrackedHashTags: getTrackedHashTags
  };

}]);
