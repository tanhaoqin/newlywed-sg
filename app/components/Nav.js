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
                            <div 
                            className="collapsible-header waves-effect waves-light black-text" 
                            style={{
                                display:"flex",
                                "justify-content": "space-between",
                                "align-items": "center"
                            }}>
                            <b>Dynamic Weights</b>
                            <span className="btn-floating btn waves-effect waves-light red">
                            <i className="material-icons"
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    "margin-left": "-15px"
                                }}>add</i></span>
                            </div>
                            <div className="collapsible-body">
                              <ul>
                                <li>Hello</li>
                                <li>World</li>                                
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