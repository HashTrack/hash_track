(function() {
	angular
	.module('hashTrack')
	.service('authentication', authentication);

	authentication.$inject = ['$window'];
	function authentication ($window) {
		var saveToken = function (token) {
			$window.localStorage['hashTrack-token'] = token;
		};

		var getToken = function () {
			return $window.localStorage['hashTrack-token'];
		};

		var register = function (user) {
			return $http.post('/register', user).success(function(data) {
				saveToken(data.token);
			});
		};

		var login = function (user) {
			return $http.post('/login', user).success(function(data) {
				saveToken(data.token);
			});
		};

		var logout = function () {
			$window.localStorage.removeItem('hashTrack-token');
		}

		return {
			saveToken: saveToken,
			getToken: getToken,
			register: register,
			login: login,
			logout: logout
		};
	}
})();