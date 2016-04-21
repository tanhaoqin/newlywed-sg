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
            <div className="card-action row profile-button">
                <div className="col s6"><img 
                    onClick={this.selectFamily.bind(this)}
                    src="web/img/FamilyOriented.png"
                    className="responsive-img"/></div>
                <div className="col s6">
                <img 
                    onClick={this.selectCareer.bind(this)}
                    src="web/img/CareerOriented.png"
                    className="responsive-img" /></div>
            </div>
          </div>
            )
    }
}