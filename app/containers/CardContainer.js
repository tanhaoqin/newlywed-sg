import { connect } from 'react-redux'
import { setProfile } from '../actions'
import ProfileCard from '../components/ProfileCard'

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
)(ProfileCard)

export default CardContainer