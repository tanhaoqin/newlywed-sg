import React from 'react';
import SideBar from './SideBar';
import SideBarSection from './SideBarSection';
import DynamicLabel from './DynamicLabel';
import { init } from '../init';


export default class Nav extends React.Component {

	constructor(props){
		super(props);
	}

    addDynamic(){
        this.props.addDynamic();
    }

    render(){
    	let weights = this.props.weights;
    	const onSelectWeight = this.props.onSelectWeight;
        let sections = []
        let categories = init.schema;
        Object.keys(categories).forEach(function(key){
            sections.push(<SideBarSection 
                key={key}
                title={categories[key].name} 
                contents={categories[key]}
                weights={weights}
                onSelectWeight={onSelectWeight}
                />);
        });
        let dynamic = this.props.dynamic;
        let dynamiclist = [];
        Object.keys(dynamic).forEach(function(key){
            console.log(key);
            dynamiclist.push(<DynamicLabel 
                key={key}
                title={key} 
                weights={dynamic[key].weights}
                buffer={dynamic[key].buffer}
                lat={dynamic[key].lat}
                lon={dynamic[key].lon}
                />);
        });
        return (
        	<header>
	            <ul id="slide-out" className="side-nav fixed blue-grey">
	                <li className="Logo white-text">
	                <h4>Where To BTO</h4>
	                <p className="section-description">Add description on how to use the application</p></li>
                    <li className="no-padding white">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header waves-effect waves-light black-text"><b>Static Weights</b>
                            </a>
                            
                            <div className="collapsible-body">
                              <ul>
                                {sections}
                              </ul>
                            </div>
                        </li>
                    </ul>
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header black-text waves-effect waves-light"><b>Dynamic Weights</b></a>
                            <div className="collapsible-body">
                              <ul>
                                {dynamiclist}
                              </ul>
                            </div>
                        </li>
                    </ul>
                </li>
	                
	            </ul>
            </header>
            )
    }

}