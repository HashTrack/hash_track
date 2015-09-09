hashTrack.directive('showSearch', function() {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'js/search/search.template.html'
  };
});
