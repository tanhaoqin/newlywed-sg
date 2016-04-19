import ProfileCard from '../components/ProfileCard';
import LeafletMap from '../components/LeafletMap';
import DynamicCard from '../components/DynamicCard';
import React from 'react';

export default class Content extends React.Component {

    constructor(props){
        super(props);
        this.state = {showDynamic:false};
    }

    onDynamicClick(){
        this.setState({showDynamic: !this.state.showDynamic});
    }

    render(){
        return(
            <main><div id="map-container">
            <ProfileCard 
                onSelectProfile={this.props.onSelectProfile}/>
            <DynamicCard 
                show={this.state.showDynamic}
                onSetDynamic={this.props.onSetDynamic}
                onDynamicClick={this.onDynamicClick.bind(this)}/>
            <LeafletMap weights={this.props.weights}
                dynamic={this.props.dynamic}
                onSetDynamic={this.props.onSetDynamic}/>
            <span 
                className="add-dynamic-button btn-floating btn waves-effect waves-light red"
                onClick={this.onDynamicClick.bind(this)}>
            <i className="material-icons"
                style={{
                    position: "absolute",
                    left: "50%",
                    "margin-left": "-18px"
                }}>add</i></span>
            </div></main>)
    }
}