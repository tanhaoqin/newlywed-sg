'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import { Map, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
// import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import {data} from '../data';
import {profile} from '../profile';
import { init } from '../init';
import { createStore } from 'redux'
import NavContainer from '../containers/NavContainer';
import Content from './Content';

export default class App extends React.Component {
    
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <NavContainer />
                <Content />
            </div>
        );
    }
}