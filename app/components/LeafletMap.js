import data from '../data';
import React from 'react';
import aggregate from 'geojson-polygon-aggregate';
import AsyncTask from 'async-task';
import work from 'webworkify';

const w = work(require('../worker.js'));

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
    const layer = this.processWeights();
    // const results = processData(that);
    const drawHexclip = this.drawHexclip;
    const that = this;
    w.addEventListener('message', function(e){
        let results = e.data[1];
        let hexClip = drawHexclip(that, results);
        that.hexClip = hexClip;
    });
    w.postMessage([data, layer]);

    // let p1 = new Promise(
    //     function(resolve, reject){
    //         console.log("Data processing promise started");
    //         resolve(processData(that));
    //     });
    // p1
    // .then(function(results){
    //     console.log("Success");
    //     new Promise(function(resolve, reject){
    //         console.log("Drawing promise started");
    //         drawHexclip(that, results);
    //     });
    // })
    // .catch(function(err){
    //     console.log("Error: "+err);
    // });
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
     var marker = L.marker([this.mapCenterLat, this.mapCenterLng], 
        {
            draggable: true,
        }).addTo(map);
     L.popup()
        .setLatLng([this.mapCenterLat+0.012, this.mapCenterLng])
        .setContent("Move this marker to indicate the exact location you want to near to")
        .openOn(map);
    // var results = this.processData(this.props);
    // this.drawHexclip(results);
    // const props = this.props;
    const that = this;
    const processData = this.processData;
    const drawHexclip = this.drawHexclip;
    // let p1 = new Promise(
    //     function(resolve, reject){
    //         console.log("Promise started");
    //         resolve(processData(that));
    //     });
    // p1
    // .then(function(results){
    //     console.log("Success");
    //     drawHexclip(that, results);
    //     })
    // .catch(function(err){
    //     console.log("Error: "+err);
    // });
    let layers = this.processWeights();
    let results  = processData(data,layers);
    let hexLayer = drawHexclip(that, results);
    this.hexLayer = hexLayer;
 }

processWeights(){
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
    return layers;
}

processData(data, layers){
    const aggregation = {
        weightSum: aggregate.sum('weight'),
    };
    return aggregate(
        data['Hexclip'], layers, aggregation);
}


drawHexclip(that, results){
    console.log(that);
    let colourScheme = that.computeColourScheme(results);
    const hexLayer = L.geoJson(results, 
        {   
            onEachFeature: function(feature, layer){
                let weightSum = feature.properties.weightSum ? feature.properties.weightSum : 0;
                layer.on({
                    mouseover: ((e) => {
                        var coordinates = e.target.getBounds().getCenter()
                        var coordinates = [coordinates['lat'], coordinates['lng']];  //Swap Lat and Lng
                        if (map) {
                           let layerPopup = L.popup()
                               .setLatLng(coordinates)
                               .setContent('Weight: '+weightSum)
                            map.openPopup(layerPopup);
                        }
                    })
                });
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
    hexLayer.addTo(that.map);
    return hexLayer;
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