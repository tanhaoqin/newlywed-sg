import { combineReducers } from 'redux'
import weights from './weights'
import filters from './filters'

const whereToBto = combineReducers({
	weights, filters
});

export default whereToBto