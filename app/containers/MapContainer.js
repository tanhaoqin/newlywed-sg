import { connect } from 'react-redux'
import LeafletMap from '../components/LeafletMap'

const mapStateToProps = (state) => {
  return {
    weights: state.weights
  }
}

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeafletMap)

export default MapContainer