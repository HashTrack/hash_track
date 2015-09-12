(function() {
	angular
	.module('hashTrack')
	.service('map', map);
	map.$inject = ['$window', '$http'];
	function map($window, $http) {

		function mapInit(lat, lon, zoom, elId) {
		  var mapProp = {
		    center: new google.maps.LatLng(lat,lon),
		    zoom: zoom,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  var map=new google.maps.Map(document.getElementById(elId),mapProp);
		}

		google.maps.event.addDomListener(window, 'load', mapInit);


		return {
			mapInit: mapInit
		};

	}
})();
