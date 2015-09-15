hashTrack.controller('TweetsController', ['$scope', '$window', '$routeParams', 'geo', 'searchgeo', function($scope, $window, $routeParams, geo, searchgeo) {
$scope.hashtag = $routeParams.h;
$scope.since = $routeParams.s;

$scope.apps = [];
$scope.markerData = [];

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

	var doGetLocalTweets = function(since) {
		searchgeo.getGeoTweets($scope.hashtag, 160, function(error, data) {
			if (error) return error;
			var i = 1;
			var newData = data.tweets.map(function(tweet) {
				var ret = {};
				if (tweet.coordinates != null) {
					ret.geolocation = {
						latitude: tweet.coordinates.coordinates[1],
						longitude: tweet.coordinates.coordinates[0]
					};
					ret.created_at = Date.parse(tweet.created_at);
					ret.text = tweet.text;
					ret.id = i;
					i++;
					console.log(ret);
					return ret;
				}
			});
			var j = 1;
			var markerData = data.tweets.map(function(marker) {
				var ret = {};
				if (marker.coordinates != null) {
					ret.title = marker.text;
					ret.date = marker.created_at;
					ret.coords = {};
					ret.coords.latitude = marker.coordinates.coordinates[1];
					ret.coords.longitude = marker.coordinates.coordinates[0];
					ret.id = j;
					j++;
					return ret;
				}
			});
			newData = searchgeo.clean(newData, undefined);
			$scope.markerOptions = { icon: '/images/tweet_icon.png' };
			$scope.markerEvents = {
				click: function(marker, eventName, model, args) {
					console.log('---------------tweet clicked----------------');
					console.log(model.title);
					$scope.tweet = {};
					$scope.tweet.text = model.title;
					$scope.tweet.date = model.date;
					$scope.showPanel();
				}
			}
			markerData = searchgeo.clean(markerData, undefined);
			
			$scope.apps = $scope.apps.concat(newData);
			$scope.markerData = $scope.markerData.concat(markerData);

			if ($scope.apps.length === 0) $window.document.getElementsByClassName("no-hashtags")[0].className = 'no-hashtags';
			if (data.tweets.length === 100) {
				console.log('running additional api calls to twitter for more recent markers');
				doGetLocalTweets(data.highest_id);
			} 
		}, since);
		return true;
	};
	doGetLocalTweets();
	mapRender(function (mapOptions) {
		$scope.map = mapOptions;
		mapDigest(function() {
			$window.document.getElementsByClassName("loading-alert")[0].className = 'loading-alert hidden';
		});
	});

	$scope.clearPanel = function() {
		console.log('the x was clicked');
		$window.document.getElementsByClassName("tweet-list")[0].className = 'tweet-list hidden';
	}

	$scope.showPanel = function() {
		console.log('the x was clicked');
		$window.document.getElementsByClassName("tweet-list")[0].className = 'tweet-list';
	}
}]);
