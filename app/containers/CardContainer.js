import { connect } from 'react-redux'
import { setProfile } from '../actions'
import Card from '../components/Card'

const mapDispatchToProps = (dispatch) => {
  return {  
    onSelectProfile: (profile) => {
      dispatch(setProfile(profile));
    },
  }
}

const CardContainer = connect(
  null,
  mapDispatchToProps
)(Card)

export default CardContainer