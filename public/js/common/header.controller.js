hashTrack.controller('HeaderController', ['$scope', '$rootScope', 'authentication', '$location', function($scope, $rootScope, authentication, $location) {
	$scope.loggedIn = function() { return authentication.isLoggedIn(); };
	
	console.log('$scope.loggedIn = ' + $scope.loggedIn());

	$scope.signout = function() {
		authentication.logout();
	}

}]);
