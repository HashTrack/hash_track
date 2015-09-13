hashTrack.controller('TweetsController', ['$scope', '$window', '$routeParams', 'geo', 'searchgeo', function($scope, $window, $routeParams, geo, searchgeo) {
	$scope.hashtag = $routeParams.h;

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

	var doGetLocalTweets = function() {
		searchgeo.getGeoTweets($scope.hashtag, 20, function(error, data) {
			if (error) return error;
			$scope.apps = data;
			data.forEach(function(tweet) {
				console.log(tweet.text);
			});
		});	
	}
 
	doGetLocalTweets();

}]);
