hashTrack.factory('searchgeo', ['$http', 'geo', function($http, geo) {

	var executeTwitterSearch = function(hashtag, lat, lon, radius, since) {
		var newURL= '/api/twitter/search/' + hashtag + '/' + lat + '/' + lon + '/' + radius + '/' + since + '/';
		console.log('searching for ' + newURL);
		return $http.get(newURL);
	}

	var clean = function(data, value) {
		  for (i=0; i<data.length; i++) {
		    if (data[i] == value) {
		      data.splice(i, 1);
		      i--;
		    }
		  }
		  return data;
	};

	var getGeoTweets = function(hashtag, radius, callback, since) {
		console.log('in getGeoTweets');
		geo.getUserGeo(function(error, geolocation) {
			executeTwitterSearch(hashtag, geolocation.latitude, geolocation.longitude, radius, since)
			.success(function(data) {
				callback(null, data);
			})
			.error(function(error) {
				callback(error, null);
			});
		});
	};

	return {
		getGeoTweets: getGeoTweets,
		clean: clean
	};
}]);
