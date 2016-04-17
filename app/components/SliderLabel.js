import React from 'react';

export default class SliderLabel extends React.Component{

    constructor(props){
        super(props);
        this.state = {previous: this.props.value};
    }

    componentWillUpdate(nextProps, nextState){
        nextState.previous = this.props.value;
     }

    handleChange(event){
        if(this.refs.weightCheckboxInput.checked){
            this.props.onSelectWeight(this.props.id, Number(this.state.previous));
        } else {
            this.props.onSelectWeight(this.props.id, 0);
        }
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
                        checked={this.props.value != 0}
                        onChange={this.handleChange.bind(this)}/>
                    <label
                        className={this.props.value != 0 ? "black-text" : ""}
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