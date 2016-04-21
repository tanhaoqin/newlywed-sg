import Loader from './Loader';
import data from '../data';
import React from 'react';
import work from 'webworkify';
import turf from 'turf';

const w = work(require('../worker.js'));

export default class LeafletMap extends React.Component {

	constructor(props){
		super(props);
		this.initialZoom = 12;
		this.mapCenterLat = 1.3521;
		this.mapCenterLng = 103.8198;
		this.dynamicMarkers = {};
		this.buffers = {};
		this.state = {
			waiting: false,
			dynamic: {}
		}
		let that = this;
		w.addEventListener('message', function(e){
			console.log(e);
			const results = e.data[1];
			const max = e.data[2];
			const colourScheme = that.computeColourScheme(max);
			let hexLayer = that.drawHexclip(results, colourScheme, that.map);
			hexLayer.addTo(that.map);
			that.hexLayer = hexLayer;
			that.setState({waiting: false});
		});
	}

	componentWillUpdate(nextProps, nextState){
		if ((JSON.stringify(nextProps.weights) != JSON.stringify(this.props.weights))||
			(JSON.stringify(nextProps.dynamic) != JSON.stringify(this.props.dynamic))){
			this.removeOverlay();	
		}
	}

	removeOverlay(){
		this.map.removeLayer(this.hexLayer);
	}

	componentDidUpdate(prevProps, prevState){
		let that = this;
		if (JSON.stringify(prevProps.dynamic) != JSON.stringify(this.props.dynamic)){
			Object.keys(this.props.dynamic).forEach(function(key){
				let dynamicProperty = that.props.dynamic[key];
				// Create initial marker and popup
				if (!that.dynamicMarkers[key]){
					let marker = L.marker(
					[that.mapCenterLat, that.mapCenterLng], 
					{
						draggable: true,
					})
					marker.on('dragend', (e) => {
						console.log(e);
						let lat = e.target._latlng.lat;
						let lng = e.target._latlng.lng;
						that.props.onSetDynamic(key, 
							dynamicProperty.weights,
							dynamicProperty.buffer,
							lat,lng);
					});
					marker.addTo(that.map);
					that.dynamicMarkers[key] = marker;
					L.popup()
						.setLatLng([that.mapCenterLat+0.012, that.mapCenterLng])
						.setContent("Move this marker to indicate the exact location you want to near to")
						.openOn(that.map);
				}
				if (JSON.stringify(prevProps.dynamic[key]) != JSON.stringify(dynamicProperty)){
					const pt = {
						type: "Feature",
						properties: {},
						geometry: {
							type: "Point",
							coordinates: [dynamicProperty.lon, dynamicProperty.lat]
						}
					};
					const buffered = turf.buffer(pt, dynamicProperty.buffer, 'kilometers').features[0];
					console.log(buffered);
					for(let feature of data.Hexclip.features){
						const centroid = turf.centroid(feature);
						let intersect = turf.inside(centroid,buffered);
						if (intersect) {
							feature.properties[key] = dynamicProperty.weights;
						} else {
							feature.properties[key] = 0;
						}
					}
					console.log(data);
				}
			});
			console.log('dynamic changed');
			w.postMessage([data.Hexclip.features, this.props.weights]);
			this.setState({waiting: true});	
		}
		else if (JSON.stringify(prevProps.weights) != JSON.stringify(this.props.weights)){
			console.log('weights changed');
			w.postMessage([data.Hexclip.features, this.props.weights]);
			this.setState({waiting: true});	
		}
	}

	componentDidMount(){
		let that = this;
		const map = L.map('map').setView([this.mapCenterLat, this.mapCenterLng], this.initialZoom);
		this.map = map;
		const osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});
		map.addLayer(osm);
		map.on('zoomend', function(e){
			if(e.target._zoom >= 14){
				that.removeOverlay();
			} else {
				that.hexLayer.addTo(that.map);
			}
		});

		this.setState({waiting: true});
		w.postMessage([data.Hexclip.features, this.props.weights]);
	}

	drawHexclip(results, colourScheme, map){
		const hexLayer = L.geoJson(results, 
		{   
			onEachFeature: function(feature, layer){
				layer.on({
					contextmenu: ((e) => {
						var coordinates = e.target.getBounds().getCenter()
						var coordinates = [coordinates['lat'], coordinates['lng']];  //Swap Lat and Lng
						if (map) {
							let layerPopup = L.popup()
								.setLatLng(coordinates)
								.setContent('Weight: '+feature.properties.weightSum)
							map.openPopup(layerPopup);
						}
					}),
					dblclick: ((e) => {
						console.log(e);
						var coordinates = e.target.getBounds().getCenter()
						var coordinates = [coordinates['lat'], coordinates['lng']];  //Swap Lat and Lng
						map.setView(coordinates, 17);
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
					return {fillOpacity: 0.75, stroke: false, color: colour};
				} else {
					return {fillOpacity: 0.50, stroke: false, color: '#edf8fb'}; 
				}
			}
		});
		return hexLayer;
	}

	componentWillUnmount(){
		this.map = null;
	}

	computeColourScheme(max){
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
			ref="map">
			<Loader waiting={this.state.waiting}/>
			</div>
		   )
	}
}