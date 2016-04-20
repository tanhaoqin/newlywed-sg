import React from 'react';

export default class ProfileCard extends React.Component {

    selectFamily(){
        this.props.onSelectProfile('FAMILY');
    }

    selectCareer(){
        this.props.onSelectProfile('CAREER');
    }

    render(){
        return (
            <div className="profile-card card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Profiles</span>
              <p><i>A ready-made profile template identifying conventional family norms can be accessed on the top right. Click on one of the two symbols that best describe your ideal family plan to generate a result.</i> </p>
            </div>
            <div className="card-action row">
                <div className="col s6"><a onClick={this.selectFamily.bind(this)}>We want a family.</a></div>
                <div className="col s6"><a onClick={this.selectCareer.bind(this)}>We focus on careers.</a></div>
            </div>
          </div>
            )
    }
}