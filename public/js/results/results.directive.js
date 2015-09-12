hashTrack.directive('showResults', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/results/results.template.html'
  };
});
