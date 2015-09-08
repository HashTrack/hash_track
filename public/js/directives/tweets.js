hashTrack.directive('showTweets', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/directives/tweets.html'
  };
});
