hashTrack.factory('searchgeo', ['$http', 'geo', function($http, geo) {

	var executeTwitterSearch = function(hashtag, lat, lon, radius) {
		var newURL= 'http://127.0.0.1:5000/api/twitter/search/' + hashtag + '/' + lat + '/' + lon + '/' + radius + '/';
		console.log('searching for ' + newURL);
		return $http.get(newURL);
	}

	var getGeoTweets = function(hashtag, radius, callback) {
		console.log('in getGeoTweets');
		geo.getUserGeo(function(error, geolocation) {
			executeTwitterSearch(hashtag, geolocation.latitude, geolocation.longitude, radius)
			.success(function(data) {
				callback(null, data);
			})
			.error(function(error) {
				callback(error, null);
			});
		});
	}

	return { getGeoTweets: getGeoTweets };
}]);
