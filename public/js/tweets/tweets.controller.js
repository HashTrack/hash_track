hashTrack.controller('TweetsController', ['$scope', '$window', '$routeParams', 'geo', function($scope, $window, $routeParams, geo) {
	geo.getUserGeo(function(error, geolocation) {
		if (error) {
			geolocation.latitude = 74;
			geolocation.longitude = -111;
			var mapOptions = { center: { latitude: 74, longitude: -111 }, zoom: 6 }
		} else {
			var mapOptions = { center: { latitude: geolocation.latitude, longitude: geolocation.longitude }, zoom: 12 };
		}

		(function() {
			console.log('latitude: ' + geolocation.latitude + ' longitude: ' + geolocation.longitude);
			console.log(mapOptions);
			$scope.map = mapOptions;
			$scope.$digest();
		})();
	});
}]);
