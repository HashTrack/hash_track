hashTrack.directive('showTrack', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/track/track.template.html'
  };
});
