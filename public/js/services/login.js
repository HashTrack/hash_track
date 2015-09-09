hashTrack.factory('login', ['$http', function($http) {
  return $http.post('http://127.0.0.1:5000/login', )
            .success(function(data) {
              console.log(data);
              return data;
            })
            .error(function(err) {
              console.log(err);
              return err;
            });
}]);
