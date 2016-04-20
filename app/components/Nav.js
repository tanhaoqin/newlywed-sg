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
	            <ul id="slide-out" className="side-nav fixed blue-grey darken-1">
	                <li className="Logo white-text"> 
                    <img id="site-logo" className="responsive-img" src="web/img/logoo.png"/ >
	                <p className="section-description"> <i> WELCOME. This map presents information to locate the best residential place in Singapore for newlyweds and those planning to get married. Our aggregation approach will generate interactive web maps where you can select your desired BTO flat using the tabs below to choose facilities and amenities that you consider as important. 
</i></p></li>
                    <li className="no-padding white">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header waves-effect waves-light black-text">
                            <b>Static Weights</b>
                            </a>
                            
                            <div className="collapsible-body waves-effect waves-light black-text"><p className="section-description"> <i> Slide the selected bar left and right to rate your preferences and the distance to your desired location will change based on it. </i> </p>
                              <ul>
                                {sections}
                              </ul>
                            </div>
                        </li>
                    </ul>
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header black-text waves-effect waves-light"><b>Dynamic Weights</b></a>
                            <div className="collapsible-body"><p className="section-description"> <i> Places such as work place or grandparent’s house, can be added into your prioritised list of consideration.  Simply click on the plus sign button and drag the drop pin to the location. </i> </p>
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