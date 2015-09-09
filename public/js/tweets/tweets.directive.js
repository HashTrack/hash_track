hashTrack.directive('showTweets', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/tweets/tweets.template.html'
  };
});
