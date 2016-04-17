import { connect } from 'react-redux'
import { setWeight } from '../actions'
import Nav from '../components/Nav'

const mapStateToProps = (state) => {
  return {
    weights: state.weights
  }
}

const mapDispatchToProps = (dispatch) => {
  return {  
    onSelectWeight: (key, weight) => {
      dispatch(setWeight(key, weight));
    },
  }
}

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)

export default NavContainer