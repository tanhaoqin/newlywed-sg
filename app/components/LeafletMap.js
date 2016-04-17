import React from 'react';

export default class LeafletMap extends React.Component {

 constructor(props){
     super(props);
     this.initialZoom = 12;
     this.mapCenterLat = 1.3521;
     this.mapCenterLng = 103.8198;

     this.state = {schoolMarkers: null};
 }

 componentWillUpdate(nextProps, nextState){
    console.log('componentWillUpdate');
    if(!nextProps.showSchoolMarkers){
        console.log('Removing school markers');
        this.map.removeLayer(nextState['schoolMarkers']);
    } else {
        console.log('Adding school markers');
        nextState['schoolMarkers'].addTo(this.map);
    }
    console.log('LeafletMap: currentState: ');
    console.log(this.state);
    console.log('LeafletMap: nextState: ');
    console.log(nextState);
 }

 componentDidMount(){
     // let mapOptions = {
     //  center: this.mapCenterLatLng(),
     //  zoom: this.initialZoom
     // }
     const map = L.map('map').setView([this.mapCenterLat, this.mapCenterLng], this.initialZoom);
     this.map = map;
     const osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     });
     map.addLayer(osm);

     const myStyle = {
         "color": "#ff7800",
         "weight": 5,
         "opacity": 0.65
     };

     const geojsonMarkerOptions = {
         radius: 8,
         fillColor: "#ff7800",
         color: "#000",
         weight: 1,
         opacity: 1,
         fillOpacity: 0.8
     };

     if (this.props.showSchoolMarkers){
         var schoolLayer = L.geoJson(this.props.schools, {
             pointToLayer: function (feature, latlng) {
                 return L.circleMarker(latlng, geojsonMarkerOptions);
             }
         });
         schoolLayer.addTo(map);        
     } else {
        if (this.state.schoolMarkers != null){
            console.log('hehe');
        }
     }
     this.setState({schoolMarkers: schoolLayer});
     // this.addBuffer(this.props.schools, Number(this.props.schoolMarkerRange));
 }

 addBuffer(data, weight){
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
    buffer_polygons.addTo(this.map);
    this.setState({schoolBuffers: buffer_polygons});
 }

 componentWillUnmount(){
    this.map = null;
 }

 render(){
     return (
         <div id="map"
             ref="map"></div>
         )
 }
}