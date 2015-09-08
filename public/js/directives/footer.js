hashTrack.directive('showFooter', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/directives/footer.html'
  };
});
