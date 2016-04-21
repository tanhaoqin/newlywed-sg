import React from 'react';
import Slider from './Slider';

export default class SideBarSection extends React.Component{

    render(){
        let sections = []
        let values = this.props.weights;
        let weights = this.props.contents.weights;
        let onSelectWeight = this.props.onSelectWeight;
        Object.keys(weights).forEach(function(key){
            sections.push(<Slider 
                key={key}
                id={key}
                name={weights[key].name}
                value={values[key]}
                onSelectWeight={onSelectWeight}
                />);
        });
        return (
                <li className="no-padding white">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header waves-effect waves-light black-text">
                                <i className="material-icons">{this.props.icon}</i>
                                <b>{this.props.title}</b>
                            </a>
                            
                            <div className="collapsible-body">
                              <ul>
                                {sections}
                              </ul>
                            </div>
                        </li>
                    </ul>
                </li>
            )
    }

}