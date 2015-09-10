hashTrack.controller('LoginController', ['$scope',  function($scope) {
	$scope.submitAuth = function(email) {
    console.log('hello');
    $scope.email = email;
		console.log('we got here');
	};
}]);
