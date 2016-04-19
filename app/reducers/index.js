import { combineReducers } from 'redux'
import weights from './weights'
import dynamic from './dynamic'

const whereToBto = combineReducers({
	weights, dynamic
});

export default whereToBto