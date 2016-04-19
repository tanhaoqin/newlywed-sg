import React from 'react';

export default class DynamicCard extends React.Component {

	addDynamicWeight(){
		this.props.onSetDynamic(this.refs.nameInput.value,Number(this.refs.weightInput.value),this.refs.bufferSize.value,1.3521,103.8198);
		this.refs.nameInput.value = "";
		this.refs.weightInput.value = "";
		this.refs.bufferSize.value = "";
		this.props.onDynamicClick();
	}

	render(){
		return (
			<div className="dynamic-card card blue-grey darken-1"
				style={{
					display:this.props.show ? 'block' : 'none'
				}}>
				<div className="card-content white-text">
					<div className="row">
					  <span className="card-title">Add Dynamic Weight</span>
					  <p>Feel free to choose from these default profiles which describes you best.</p>
					</div>
					<div className="row">
					<div className="card-input input-field col s4">
					  <input placeholder="Dynamic Weight 1" id="dynamic_weight" type="text" className="validate" ref="nameInput"/>
					  <label htmlFor="dynamic_weight">Name</label>
					</div>
					<div className="card-input input-field col s4">
					  <input placeholder="10" id="weight" type="Number" className="validate" ref="weightInput"/>
					  <label htmlFor="weight">Weight</label>
					</div>
					<div className="card-input input-field col s4">
					  <input placeholder="10" id="buffer" type="Number" className="validate" ref="bufferInput"/>
					  <label htmlFor="buffer">Buffer size (in km)</label>
					</div>
					</div>
					<div className="row">
						<button className="col s6 offset-s6 btn waves-effect waves-light"
							onClick={this.addDynamicWeight.bind(this)}>Submit<i className="material-icons right">send</i>
						</button>
					</div>
				</div>
			</div>
			)
	}
}