import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
    
    render() {
        return (
        	<div>
	        	<Nav data={this.props.data}/>
	        	<Content data={this.props.data}/>
        	</div>
        );
    }
}

class Content extends React.Component {
	render(){
		return (
			<main>
        		<GoogleMap data={this.props.data}/>
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
		let markers = [];
		let marker = new google.maps.Marker({
			position: this.mapCenterLatLng(),
			title: 'Hi', 
			map: map
			});
		markers.push(marker);
		this.setState({markers: markers});
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
					<SideBar data={this.props.data}/>
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
		let sections = []
		let weights = this.props.data;
		weights.forEach(function(weight){
			sections.push(<Slider key={weight.name} weight={weight}/>);
		});

		return (
			<ul id="slide-out" className="side-nav fixed">
				<li className="Logo black-text"><b><a>Welcome to blah@blah</a></b></li>
				<li className="no-padding black-text">
					<ul className="collapsible collapsible-accordion">
						<li>
							<a className="collapsible-header waves-effect waves-teal"><b>Weights</b></a>
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
		this.state = {
			value: this.props.weight.initialWeight, 
			active: this.props.weight.active};
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
				active={this.state.active}
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
		this.props.onUserInput(
			this.refs.rangeSliderInput.value);
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

class SliderLabel extends React.Component{

	constructor(props){
		super(props);
		this.state = {active: this.props.active};
	}

	click(){
		this.setState({active: this.refs.weightCheckboxInput.checked});		
	}

	render(){
		console.log(this.props.active);
		return(
			<form>
			<div className="range-label row">
				<div className="col s9">
					<input 
						ref="weightCheckboxInput"
						type="checkbox" 
						id={this.props.name} 
						checked={this.state.active}
						onChange={this.click.bind(this)}/>
					<label
						className={this.state.active ? "black-text" : ""}
						ref="weightCheckboxLabel" 
						htmlFor={this.props.name}>{this.props.name}</label>
				</div>
 				<div className="col s3">{this.props.value}</div>
				</div>
			</form>
			)
	}
}
