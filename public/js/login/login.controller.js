hashTrack.controller('LoginController', ['$scope', 'authentication', '$http', function($scope, authentication, $http) {
	// initialize credentials
	$scope.credentials = {
		email_address: "",
		password: "",
	};

	// initialize auth type
	$scope.authType = "";

	$scope.submitAuth = function(email, password, authType) {
		console.log('Login button clicked...');
		console.log('Email address: ' + email);
		console.log('Password: ' + password);
		console.log('Auth type: ' + authType);
		$scope.credentials.email_address = email;
		$scope.credentials.password = password;
		$scope.authType = authType;
		$scope.checkCrecentials();
	};

	$scope.checkCrecentials = function() {
		if (!$scope.credentials.email_address || !$scope.credentials.password || !$scope.authType) {
			$scope.formError = "Please complete all fields";
		} else {
			$scope.doAuth($scope.authType);
		};
	};

	$scope.doAuth = function(authType) {
		$scope.formError = "";
		switch(authType) {
			case 'login':
				authentication
				.login($scope.credentials)
				.error(function(error) {
					$scope.formError = error.message;
				})
				.then(function() {
					console.log('login successful!');
				});
				break;
			case 'register':
				authentication
				.register($scope.credentials)
				.error(function(error) {
					$scope.formError = error;
				})
				.then(function() {

				});
				break;
			default:
				return;
		}
	};

}]);
