hashTrack.directive('showResults', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/directives/results.html'
  };
});
