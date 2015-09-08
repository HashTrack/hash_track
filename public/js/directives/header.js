hashTrack.directive('showHeader', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/directives/header.html'
  };
});
