hashTrack.controller('TweetsController', ['$scope', '$sce', '$window', '$routeParams', 'geo', 'searchgeo', function($scope, $sce, $window, $routeParams, geo, searchgeo) {
$scope.hashtag = $routeParams.h;
$scope.since = $routeParams.s;

$scope.apps = [];
$scope.markerData = [];
$scope.hideNoTweets = true;
$scope.hideTweetPanel = true;

var mapDigest = function (callback) {
	console.log('before digest');
	$scope.$digest();
	console.log('after digest');
	callback();
}

var generateLinks = function(tweet) {
	var links = tweet.match(/https?:\/\/\S+/g);
	var newTweet;
	if (links) {	
		links.forEach(function(item) {
			newTweet = tweet.replace(item, '<a href="' + item + '" target="_blank">' + item + '</a>');
		});
	} else {
		newTweet = tweet;
	}
	return newTweet;
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
		searchgeo.getGeoTweets($scope.hashtag, 300, function(error, data) {
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
					ret.user = {};
					ret.title = $sce.trustAsHtml(generateLinks(marker.text));
					ret.date = Date.parse(marker.created_at);
					ret.coords = {};
					ret.coords.latitude = marker.coordinates.coordinates[1];
					ret.coords.longitude = marker.coordinates.coordinates[0];
					ret.user.profile_image = marker.user.profile_image_url;
					ret.user.screen_name = marker.user.screen_name
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
					$scope.tweet.user = {};
					$scope.tweet.user.profile_image = model.user.profile_image;
					$scope.tweet.user.screen_name = model.user.screen_name;
					console.log($scope.tweet.user.profile_image);
					$scope.tweet.text = model.title;
					$scope.tweet.date = model.date;
					$scope.hideTweetPanel = false;
					
				}
			}
			markerData = searchgeo.clean(markerData, undefined);
			
			$scope.apps = $scope.apps.concat(newData);
			$scope.markerData = $scope.markerData.concat(markerData);

			if ($scope.apps.length === 0) $scope.hideNoTweets = false;
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
			$scope.clearPanel('loading-alert');
		});
	});

	$scope.clearPanel = function(panelClass) {
		console.log('the x was clicked');
		$window.document.getElementsByClassName(panelClass)[0].className = panelClass + ' hidden';
	}

	$scope.showPanel = function(panelClass) {
		console.log('the x was clicked');
		$window.document.getElementsByClassName(panelClass)[0].className = panelClass;
	}

	$scope.toggleTweetPanel = function() {
		$scope.hideTweetPanel = !$scope.hideTweetPanel;
	}

}]);
