hashTrack.directive('showFooter', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/directives/components/footer.html'
  };
});
