hashTrack.directive('showTrack', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/directives/track.html'
  };
});
