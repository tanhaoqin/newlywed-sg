import React from 'react';

export default class SliderInput extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {value: this.props.value};
    }

    handleChange(){
        this.props.onSelectWeight(
            this.props.id,
            Number(this.refs.rangeSliderInput.value));
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