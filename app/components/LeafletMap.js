import data from '../data';
import React from 'react';
import aggregate from 'geojson-polygon-aggregate';

console.log(data);

export default class LeafletMap extends React.Component {

 constructor(props){
     super(props);
     this.initialZoom = 12;
     this.mapCenterLat = 1.3521;
     this.mapCenterLng = 103.8198;

     this.state = {markers: {}};
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
    console.log(data);

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

    let filters = this.props.filters;
    let weights = this.props.weights;
    let layers = {
        features: [],
        type: "FeatureCollection"
    };
    Object.keys(filters).forEach(function(key){
        if (filters[key] == true){
            // console.log(key);
            // console.log(data[key]);
            var layer = L.geoJson(data[key], 
                {
                    onEachFeature: function(feature, layer){
                        feature.properties.weight = weights[key];
                    }
                });
            // layer.addTo(map);
            layers.features = layers.features.concat(layer.toGeoJSON().features);
        }
    });

    console.log(layers);
    const aggregation = {
        weightSum: aggregate.sum('weight'),
    };

    var results = aggregate(
        data['Hexclip'], layers, aggregation);
    // console.log(results);
    var hexLayer = L.geoJson(results, 
        {   
            style: function(feature){
                if (feature.properties.weightSum) {
                    return {fillOpacity: 0.5, stroke: false, color: 'black'};
                } else {
                    return {fillOpacity: 0.5, stroke: false, color: 'red'}; 
                }
            }
        });
    hexLayer.addTo(map);

     
     // this.setState({schoolMarkers: schoolLayer});
     // this.addBuffer(this.props.schools, Number(this.props.schoolMarkerRange));
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