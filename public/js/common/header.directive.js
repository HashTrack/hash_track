hashTrack.directive('showHeader', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/common/header.template.html'
  };
});
