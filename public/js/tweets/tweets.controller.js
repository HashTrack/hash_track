hashTrack.controller('TweetsController', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
	(function() {
		if ($window.navigator.geolocation) {
			$rootScope.userGeo = {};
			$window.navigator.geolocation.getCurrentPosition(function(position) {
				console.log('getting position...');
				$rootScope.userGeo.latitude = position.coords.latitude;
				$rootScope.userGeo.longitude = position.coords.longitude;
				console.log('latitude: ' + $rootScope.userGeo.latitude + ' longitude: ' + $rootScope.userGeo.longitude);
				$scope.map = { center: { latitude: $rootScope.userGeo.latitude, longitude: $rootScope.userGeo.longitude }, zoom: 12 };
				$scope.$digest();
			});
		}
	})();

}]);
