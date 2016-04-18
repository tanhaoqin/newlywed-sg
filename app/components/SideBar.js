import React from 'react';
import Slider from './Slider';
import SideBarSection from './SideBarSection';

export default class SideBar extends React.Component {

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
            <ul id="slide-out" className="side-nav fixed blue-grey">
                <li className="Logo black-text">
                <h4>Where To BTO</h4>
                <p className="section-description">Add description on how to use the application</p></li>
                <SideBarSection title="Weights" 
                sections={sections} 
                desc={weightDesc}/>
            </ul>
            )
    }
}