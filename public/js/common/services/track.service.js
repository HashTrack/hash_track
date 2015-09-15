hashTrack.factory('track', ['$http', 'authentication', function($http, authentication) {

  var getToken = function () {
    return authentication.getToken();
  };

  var trackHashtag = function (hashtag, last_tweet_id, userId) {
    console.log('Saving hashtag: ' + hashtag + ' to the tracked DB...');
    var token = getToken();
    $http.defaults.headers.common.Authorization = "Bearer " + token;
    $http.post('/api/hashtags', {
      name: hashtag,
      user: userId,
      tracked: true,
      last_tweet_id: last_tweet_id,
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
      console.log('Got the tags, calling back to controller')
      callback(null, data);
    });
  }

  var unTrack = function(hashtagId, callback) {
    $http.put('/api/hashtags/'+ hashtagId, {
      tracked: false,
    }).error(function (error) {
      console.log(error);
      callback(error, null);
    }).success(function (data) {
      console.log(data);
      callback(null, data);
    });
  };
  return {
    trackHashtag: trackHashtag,
    getTrackedHashTags: getTrackedHashTags,
    unTrack: unTrack
  };

}]);
