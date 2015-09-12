hashTrack.controller('TweetsController', ['$scope', function($scope) {
	console.log('I am in the center');
	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
}]);
