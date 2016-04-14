'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
// import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import {data} from './data';
import {profile} from './profile';
import {schools} from './schools';

export default class App extends React.Component {
    
    constructor() {
        super();
        this.state = {data: data,
            schools: schools};
    }

    handleChange(data){
        console.log('App: handleChange');
        console.log(data);
        this.setState({
            data: data
        });
    }

    render() {
        return (
            <div>
                <Nav 
                    data={this.state.data}
                    onChange={this.handleChange.bind(this)}/>
                <Content data={this.state.data} schools={this.state.schools}/>
            </div>
        );
    }
}

class Content extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <main><div id="map-container">
            <LeafletMap 
                showSchoolMarkers={this.props.data['Education'].active}
                schoolMarkerRange={this.props.data['Education'].value}
                schools={this.props.schools}/>
            </div></main>)
    }
}

class LeafletMap extends React.Component {

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

class SchoolMarker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            divIconHtml: React.renderToStaticMarkup(
                )
        };
    }

    render() {
        return <div></div>;
    }
}

class Nav extends React.Component {

    render(){
        return (
            <header>
                <nav>
                    <TitleBar/>
                    <SideBar data={this.props.data} onChange={this.props.onChange}/>
                </nav>
            </header>   
            )
    }

}

class TitleBar extends React.Component {
    render(){
        return (
            <h1 
                className="container">
                <div className="nav-wrapper">Where To BTO?
                </div>
            </h1>
            )
    }
}

class SideBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {data : this.props.data};
    }

    handleSliderChange(key, weight){
        console.log('SideBar: handleSliderChange('+key+","+weight.value+","+weight.active+')');
        var temp = this.state.data;
        temp[key] = weight;
        this.setState({data: temp});
        this.props.onChange(this.state.data);
    }

    render(){
        const callback = this.handleSliderChange.bind(this);
        let sections = []
        let weights = this.state.data;
        Object.keys(weights).forEach(function(key){
            sections.push(<Slider 
                key={key}
                name={key} 
                weight={weights[key]}
                onChange={callback}/>);
        });
        const weightDesc = "Use these weights to help you decide on the features you wish to prioritise.";
        const profileDesc = "Select from these profiles that you think suits you";
        return (
            <ul id="slide-out" className="side-nav fixed">
                <li className="Logo black-text"><b><a>Welcome to blah@blah</a></b></li>
                <SideBarSection title="Weights" 
                sections={sections} 
                desc={weightDesc}/>
                <SideBarSection title="Profile" desc={profileDesc}/>
            </ul>
            )
    }
}

class SideBarSection extends React.Component{

    render(){
        return (
                <li className="no-padding black-text">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header waves-effect waves-teal"><b>{this.props.title}</b>
                            </a>
                            <div className="collapsible-body">
                             <p className="section-description">{this.props.desc}</p>
                              <ul>
                                {this.props.sections}
                              </ul>
                            </div>
                        </li>
                    </ul>
                </li>
            )
    }

}

class Slider extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: this.props.weight.value, 
            active: this.props.weight.active};
    }

    handleUserInput(value){
        this.setState({value: value});
        this.props.onChange(this.props.name, this.state);
    }

    handleCheck(active){
        console.log('Slider: handleCheck('+active+')');
        let tempState = this.state;
        tempState.active = active;
        this.props.onChange(this.props.name, tempState);
    }

    render(){
        return(
            <li className="black-text section">
            <div className="container">
            <SliderLabel 
                value={this.state.value}
                active={this.state.active}
                title={this.props.name}
                onUserInput={this.handleCheck.bind(this)}
                />
            <SliderInput
                value={this.state.value}
                onUserInput={this.handleUserInput.bind(this)} />
            </div>
            </li>
            )
    }
}

class SliderInput extends React.Component {
    
    handleChange(){
        this.props.onUserInput(
            this.refs.rangeSliderInput.value);
    }

    render(){
        return(
            <form action="#">
            <div className="range-field">
                <input
                ref="rangeSliderInput"
                type="range"
                min="0" 
                max="10"
                value={this.props.value}
                onChange={this.handleChange.bind(this)}/>
            </div>
            </form>)
    }
}

class SliderLabel extends React.Component{

    constructor(props){
        super(props);
        this.state = {active: this.props.active};
    }

    handleChange(event){
        console.log('SliderLabel: handleChange('+this.refs.weightCheckboxInput.checked+')');
        this.setState({active: this.refs.weightCheckboxInput.checked});     
        // this.setState({active: !this.state.active});
        this.props.onUserInput(this.refs.weightCheckboxInput.checked);
    }

    render(){
        return(
            <form>
            <div className="range-label row">
                <div className="col s9">
                    <input 
                        ref="weightCheckboxInput"
                        type="checkbox" 
                        id={this.props.title} 
                        defaultChecked={this.state.active}
                        onChange={this.handleChange.bind(this)}/>
                    <label
                        className={this.state.active ? "black-text" : ""}
                        ref="weightCheckboxLabel" 
                        htmlFor={this.props.title}>
                        {this.props.title}
                    </label>
                </div>
                <div className="col s3">{this.props.value}</div>
                </div>
            </form>
            )
    }
}