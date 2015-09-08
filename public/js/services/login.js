hashTrack.factory('login', ['$http', function($http) {
  return $http.post('localhost:5000/login')
            .success(function(data) {
              console.log(data);
              return data;
            })
            .error(function(err) {
              console.log(data);
              return err;
            });
}]);
