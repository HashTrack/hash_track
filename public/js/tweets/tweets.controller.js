hashTrack.controller('TweetsController', ['$scope', '$window', '$routeParams', 'geo', 'searchgeo', function($scope, $window, $routeParams, geo, searchgeo) {
	$scope.hashtag = $routeParams.h;

var mapRender = function (callback){
	geo.getUserGeo(function(error, geolocation) {
		if (error) {
			geolocation.latitude = 74;
			geolocation.longitude = -111;
			$scope.mapOptions = { center: { latitude: 74, longitude: -111 }, zoom: 6 }
		} else {
			$scope.mapOptions = { center: { latitude: geolocation.latitude, longitude: geolocation.longitude }, zoom: 12 };
		}
		console.log('latitude: ' + geolocation.latitude + ' longitude: ' + geolocation.longitude);
	});
	callback ($scope.mapOptions);
};

	var doGetLocalTweets = function() {
		searchgeo.getGeoTweets($scope.hashtag, 20, function(error, data) {
			if (error) return error;
			var newData = data.map(function(tweet) {
				if (tweet.coordinates != null) {
					tweet.geolocation = {
						latitude: tweet.coordinates.coordinates[1],
						longitude: tweet.coordinates.coordinates[0]
					};
					tweet.created_at = Date.parse(tweet.created_at);
					tweet.mapOptions = {icon:'/images/tweet_icon.png'};
					return tweet;
				}
			});
			newData = searchgeo.clean(newData, undefined);
			$scope.apps = newData;
			mapRender(function (mapOptions) {
				$window.document.getElementsByClassName("tweet-list")[0].className = 'tweet-list';
				if ($scope.apps.length === 0){
					$window.document.getElementsByClassName("no-hashtags")[0].className = 'no-hashtags';
				};
				$scope.map = mapOptions;
				$scope.$digest();
				$window.document.getElementsByClassName("loading-alert")[0].className += ' hidden';
			});

		});
	};

	doGetLocalTweets();

}]);
