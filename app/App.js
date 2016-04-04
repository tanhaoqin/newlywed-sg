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
		console.log(mapOptions);
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
		return (
			<ul id="slide-out" className="side-nav fixed">
				<li className="Logo black-text"><b><a>Welcome to blah@blah</a></b></li>
				<li className="bold"><a href="#!">First Sidebar Link</a></li>
				<li><a href="#!">Second Sidebar Link</a></li>
			</ul>
			)
	}
}