import { connect } from 'react-redux'
import { setWeight } from '../actions'
import Nav from '../components/Nav'

const mapStateToProps = (state) => {
  return {
    weights: state.weights,
    dynamic: state.dynamic
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    onSelectWeight: (key, weight) => {
      dispatch(setWeight(key, weight));
    },
    onAddDynamic: (key, weight, lat, lng) => {
      dispatch(setDynamic(key, weight, lat, lng));
    }
  }
}

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)

export default NavContainer