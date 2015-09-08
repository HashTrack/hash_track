hashTrack.directive('showLogin', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/directives/login.html'
  };
});
