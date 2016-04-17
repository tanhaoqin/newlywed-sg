import { connect } from 'react-redux'
import LeafletMap from '../components/LeafletMap'

const mapStateToProps = (state) => {
  return state;
}

const MapContainer = connect(
  mapStateToProps,
  null
)(LeafletMap)

export default MapContainer