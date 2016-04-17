import CardContainer from '../containers/CardContainer';
import LeafletMap from './LeafletMap';
import React from 'react';

export default class Content extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <main><div id="map-container">
            <CardContainer />
            <LeafletMap 
                showSchoolMarkers={this.props.data['Education'].active}
                schoolMarkerRange={this.props.data['Education'].value}
                schools={this.props.schools}/>

            </div></main>)
    }
}