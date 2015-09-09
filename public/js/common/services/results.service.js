hashTrack.factory('results', ['$http', function($http) {
  return $http.get('http://127.0.0.1:5000/api/twitter/pizza/')

}]);
