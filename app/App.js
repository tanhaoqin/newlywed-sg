import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
    
    render() {
        return (
        	<div>
	        	<Nav />
	        	<Content />
        	</div>
        );
    }
}

class Content extends React.Component {
	render(){
		return (
			<main>
        		<GoogleMap />
	        </main>
			)
	}
}

class GoogleMap extends React.Component {

	constructor(props){
		super(props);
		this.initialZoom = 12;
		this.mapCenterLat = 1.3521;
		this.mapCenterLng = 103.8198;
	}

	componentDidMount(){
		let mapOptions = {
			center: this.mapCenterLatLng(),
			zoom: this.initialZoom
		}
		const map = new google.maps.Map(this.refs.map, mapOptions);
		this.setState({map: map});
	}

	mapCenterLatLng(){
		let props = this.props;
		return new google.maps.LatLng(this.mapCenterLat,this.mapCenterLng);
	}

	render(){
		return (
			<div id="map"
				ref="map"></div>
			)
	}
}

class Nav extends React.Component {
	render(){
		return (
			<header>
				<nav>
					<TitleBar/>
					<SideBar/>
				</nav>
			</header>	
			)
	}

}

class TitleBar extends React.Component {
	render(){
		return (
			<h1 
				className="container">
				<div className="nav-wrapper">Newlyweds@SG
				</div>
			</h1>
			)
	}
}

class SideBar extends React.Component {
	render(){
		let sections = [];
		const weights = [
			{name: "Schools", initialWeight: 9},
			{name: "Hospitals", initialWeight: 5},
			{name: "Hello", initialWeight: 7},
			{name: "World", initialWeight: 3}];
		weights.forEach(function(weight){
			sections.push(<Slider key={weight.name} weight={weight}/>);
		});
		return (
			<ul id="slide-out" className="side-nav fixed">
				<li className="Logo black-text"><b><a>Welcome to blah@blah</a></b></li>
				<li className="no-padding black-text">
					<ul className="collapsible collapsible-accordion">
						<li>
							<a className="teal collapsible-header waves-effect waves-teal"><b>Weights</b></a>
				            <div className="collapsible-body">
				              <ul>
				                {sections}
				              </ul>
				            </div>
				        </li>
					</ul>
				</li>
			</ul>
			)
	}
}

class Slider extends React.Component {

	constructor(props){
		super(props);
		this.state = {value: this.props.weight.initialWeight};
	}

	handleUserInput(value){
		this.setState({value: value});
	}

	render(){
		return(
			<li className="black-text section">
			<div className="container">
			<SliderLabel 
				value={this.state.value}
				name={this.props.weight.name}
				/>
			<SliderInput
				value={this.state.value}
				onUserInput={this.handleUserInput.bind(this)} />
			</div>
			</li>
			)
	}
}

class SliderInput extends React.Component {
	
	handleChange(){
		let new_value = this.refs.rangeSliderInput.value;
		// this.props.value = new_value;
		this.props.onUserInput(
			this.refs.rangeSliderInput.value);
	}

	render(){
		return(
			<form action="#">
			<p className="range-field">
				<input
				ref="rangeSliderInput"
				type="range"
				min="0" 
				max="10"
				value={this.props.value}
				onChange={this.handleChange.bind(this)}/>
			</p>
			</form>)
	}
}

class SliderLabel extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<p className="range-label">{this.props.name} {this.props.value}</p>
			)
	}
}
