import React from 'react';
import SideBar from './SideBar';
import SideBarSection from './SideBarSection';
import { init } from '../init';


export default class Nav extends React.Component {

	constructor(props){
		super(props);
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
        return (
        	<header>
	            <ul id="slide-out" className="side-nav fixed blue-grey darken-1">
	                <li className="Logo black-text">
	                <h4>Where To BTO</h4>
	                <p className="section-description">Add description on how to use the application</p></li>
	                {sections}
	            </ul>
            </header>
            )
    }

}