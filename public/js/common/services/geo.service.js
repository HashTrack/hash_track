(function() {
	angular
	.module('hashTrack')
	.service('geo', geo);

	geo.$inject = ['$window'];

	function geo($window) {

		var getUserGeo = function(callback) {
			if ($window.navigator.geolocation) {
				var userGeo = {};
				$window.navigator.geolocation.getCurrentPosition(function(position) {
					console.log('getting position...');
					userGeo.latitude = position.coords.latitude;
					userGeo.longitude = position.coords.longitude;
					callback(null, userGeo);
				});
			} else {
				callback({status: 'error', message: 'No geolocation availble'}, {latitude: null, longitude: null});
			}
		}

		return {
			getUserGeo: getUserGeo
		};

	}

})();