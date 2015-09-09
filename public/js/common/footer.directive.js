hashTrack.directive('showFooter', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/common/footer.template.html'
  };
});
