export default function(self) {
	self.addEventListener('message', function(data, weight){
		let buffer_data = turf.buffer(data, weight/5, 'kilometers');
	    buffer_data.properties = {
	        "fill": "#6BC65F",
	        "stroke": "#25561F",
	        "stroke-width": 2
	    };
	    let buffer_polygons = L.geoJson(buffer_data, {
	        pointToLayer: function (feature, latlng) {
	            return L.polygon(latlng);
	        }
	    });
	    return buffer_polygons;
	})
}