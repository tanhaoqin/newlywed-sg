'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
// import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import {data} from '../data';
import {profile} from '../profile';
import { init } from '../init';
import {schools} from '../schools';
import { createStore } from 'redux'
import NavContainer from '../containers/NavContainer';
import Content from './Content';

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
                <NavContainer />
                <Content data={this.state.data} schools={this.state.schools}/>
            </div>
        );
    }
}