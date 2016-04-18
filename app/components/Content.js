import CardContainer from '../containers/CardContainer';
import MapContainer from '../containers/MapContainer';
import React from 'react';

export default class Content extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <main><div id="map-container">
            <CardContainer />
            <MapContainer />
            </div></main>)
    }
}