import React from 'react';
import SideBar from './SideBar';
import SideBarSection from './SideBarSection';
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
                        <li style={{
                                    height:"64px",
                                    "position": "relative",
                                }}>
                            <a className="collapsible-header black-text waves-effect waves-light"
                                style={{
                                    "position": "absolute",
                                    left: "0px",
                                    right: "0px"
                                }}><b>Dynamic Weights</b></a>
                            <div className="collapsible-body"
                                style={{
                                    "position": "absolute",
                                    top: "64px",
                                    left: "0px",
                                    right: "0px"
                                }}>
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