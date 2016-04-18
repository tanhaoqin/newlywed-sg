import { combineReducers } from 'redux'
import weights from './weights'
import waiting from './waiting'

const whereToBto = combineReducers({
	weights, waiting
});

export default whereToBto