hashTrack.controller('TweetsController', ['$scope', '$window', '$routeParams', 'geo', 'searchgeo', function($scope, $window, $routeParams, geo, searchgeo) {
	$scope.hashtag = $routeParams.h;

var mapDigest = function (callback) {
	console.log('before digest');
	$scope.$digest();
	console.log('after digest');
	callback();
}

var mapRender = function (callback){
	geo.getUserGeo(function(error, geolocation) {
		if (error) {
			geolocation.latitude = 74;
			geolocation.longitude = -111;
			$scope.mapOptions = { center: { latitude: 74, longitude: -111 }, zoom: 6 }
		} else {
			$scope.mapOptions = { center: { latitude: geolocation.latitude, longitude: geolocation.longitude }, zoom: 9 };
		}
		console.log('latitude: ' + geolocation.latitude + ' longitude: ' + geolocation.longitude);
		callback ($scope.mapOptions);
	});
};

	var doGetLocalTweets = function() {
		searchgeo.getGeoTweets($scope.hashtag, 160, function(error, data) {
			if (error) return error;
			var i = 1;
			var newData = data.map(function(tweet) {
				var ret = {};
				if (tweet.coordinates != null) {
					ret.geolocation = {
						latitude: tweet.coordinates.coordinates[1],
						longitude: tweet.coordinates.coordinates[0]
					};
					ret.created_at = Date.parse(tweet.created_at);
					ret.mapOptions = {icon:'/images/tweet_icon.png'};
					ret.text = tweet.text;
					ret.id = i;
					i++;
					console.log(ret);
					return ret;
				}
			});
			newData = searchgeo.clean(newData, undefined);
			$scope.apps = newData;
			mapRender(function (mapOptions) {
				$scope.map = mapOptions;
				mapDigest(function() {
					$window.document.getElementsByClassName("tweet-list")[0].className = 'tweet-list';
					if ($scope.apps.length === 0){
						$window.document.getElementsByClassName("no-hashtags")[0].className = 'no-hashtags';
					};
					$window.document.getElementsByClassName("loading-alert")[0].className += ' hidden';
					console.log('are we still waiting for the map?');
				});

			});

		});
	};

	doGetLocalTweets();

}]);
