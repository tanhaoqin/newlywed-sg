import { connect } from 'react-redux'
import { setProfile, setDynamic } from '../actions'
import Content from '../components/Content'

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {  
    onSelectProfile: (profile) => {
      dispatch(setProfile(profile));
    },
    onSetDynamic: (key, weight, buffer, lat, lng) => {
      dispatch(setDynamic(key, weight, buffer, lat, lng));
    }
  }
}

const ContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)

export default ContentContainer