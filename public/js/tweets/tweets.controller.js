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
			var newData = data.map(function(tweet) {
				if (tweet.coordinates != null) {
					tweet.geolocation = {
						latitude: tweet.coordinates.coordinates[1],
						longitude: tweet.coordinates.coordinates[0]
					};
					return tweet;
				}
			});
			newData = searchgeo.clean(newData, undefined);
			$scope.apps = newData;
			$window.document.getElementsByClassName("loading-alert")[0].className += ' hidden';
			$window.document.getElementsByClassName("tweet-list")[0].className -= ' hidden';
		});
	}

	doGetLocalTweets();

}]);
