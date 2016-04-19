import React from 'react';

export default class DynamicLabel extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <li className="black-text white section">
            <div className="container">
                <div className="dynamic-label"><b>{this.props.title}</b></div>
                <div className="dynamic-label">Weight: {this.props.weights}</div>
                <div className="dynamic-label">Buffer Size: {this.props.buffer}</div>
                <div className="dynamic-label">Lat: {this.props.lat}, Lon: {this.props.lon}</div>
            </div>
            </li>
            )
    }
}