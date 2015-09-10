hashTrack.controller('HeaderController', ['$scope', 'authentication', function($scope, authentication) {
	if (authentication.isLoggedIn()) {
		console.log('header says logged in is: ' + authentication.currentUser().email_address);
	}
}]);
