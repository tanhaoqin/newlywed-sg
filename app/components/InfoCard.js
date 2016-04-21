import React from 'react';

export default class InfoCard extends React.Component {

    render(){
        return (
            <div className="info-card card blue-grey darken-1"
                style={{
                    display:this.props.show ? 'block' : 'none'
                }}>
                <div className="card-content white-text">
                    <div className="row">
                      <span className="card-title">{this.props.title}</span>
                      <p>{this.props.desc}</p>
                    </div>
                </div>
            </div>
            )
    }
}