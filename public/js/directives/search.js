hashTrack.directive('showSearch', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/directives/search.html'
  };
});
