import React from 'react';
import SliderLabel from './SliderLabel';
import SliderInput from './SliderInput';

export default class Slider extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value: this.props.value, 
            active: true};
    }

    render(){
        return(
            <li className="black-text section">
            <div className="container">
            <SliderLabel 
                id={this.props.id}
                value={this.props.value}
                active={this.state.active}
                title={this.props.name}
                onSelectWeight={this.props.onSelectWeight}
                />
            <SliderInput
                id={this.props.id}
                value={this.props.value}
                onSelectWeight={this.props.onSelectWeight}
                />
            </div>
            </li>
            )
    }
}