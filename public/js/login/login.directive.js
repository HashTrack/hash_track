hashTrack.directive('showLogin', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/login/login.template.html'
  };
});
