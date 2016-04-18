import data from '../data';
import React from 'react';
import aggregate from 'geojson-polygon-aggregate';

export default class LeafletMap extends React.Component {

 constructor(props){
     super(props);
     this.initialZoom = 12;
     this.mapCenterLat = 1.3521;
     this.mapCenterLng = 103.8198;

     this.state = {markers: {}};
 }

 componentWillUpdate(nextProps, nextState){
    this.map.removeLayer(this.hexLayer);
 }

 componentDidUpdate(){
    var results = this.processData(this.props);
    this.drawHexclip(results);
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

    var results = this.processData(this.props);
    this.drawHexclip(results);
    // const props = this.props;
    // const processData = this.processData;
    // let p1 = new Promise(
    //     function(resolve, reject){
    //         console.log("Promise started");
    //         processData(props);
    //     });
    // console.log(p1);
    // p1
    // .then(function(val){
    //     console.log("Success");
    //     console.log(val);
    //     })
    // .catch(function(err){
    //     console.log("Error: "+err);
    // });
 }

processData(props){
    let filters = props.filters;
    let weights = props.weights;
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
    const aggregation = {
        weightSum: aggregate.sum('weight'),
    };
    return aggregate(
        data['Hexclip'], layers, aggregation);
}
drawHexclip(results){
    let colourScheme = this.computeColourScheme(results);
    const hexLayer = L.geoJson(results, 
        {   
            onEachFeature: function(feature, layer){
                layer.bindPopup("Weight: "+feature.properties.weightSum);
            },
            style: function(feature){
                if (feature.properties.weightSum) {
                    let colour;
                    Object.keys(colourScheme).forEach(function(key){
                        if (feature.properties.weightSum > key){
                            colour = colourScheme[key];
                        }
                    });
                    return {fillOpacity: 0.8, stroke: false, color: colour};
                } else {
                    return {fillOpacity: 0.8, stroke: false, color: '#edf8fb'}; 
                }
            }
        });
    hexLayer;
    hexLayer.addTo(this.map);
    this.hexLayer = hexLayer;
}

 componentWillUnmount(){
    this.map = null;
 }

computeColourScheme(featureCollection){
    let max = 0;
    for (let feature of featureCollection.features) {
        if (feature.properties.weightSum){
            if (feature.properties.weightSum > max){
                max = feature.properties.weightSum;
            }
        }
    }
    const colour = ["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"];
    const step = max/5;
    let breakpoints = {};
    for (let i = 0; i < 5; i++){
        breakpoints[(i)*step] = colour[i];
    }
    return breakpoints;
}

 render(){
     return (
         <div id="map"
             ref="map"></div>
         )
 }
}