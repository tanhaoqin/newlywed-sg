import {init} from '../init';

const family_profile = init.profiles.FAMILY;
const career_profile = init.profiles.CAREER;

const weights = (state = init.weights, action) => {
    switch (action.type){
        case 'SET_PROFILE':
        	if (action.profile == 'FAMILY'){
        		return family_profile;
        	}
        	else if (action.profile == 'CAREER'){
        		return career_profile;
        	}
            return state;
        case 'SET_WEIGHT':
            var newState = Object.assign({}, state);
            newState[action.key] = action.weight;
            return newState;
        default:
            return state;
    }
}

export default weights;