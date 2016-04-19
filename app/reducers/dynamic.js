const dynamic = (state = {}, action) => {
    switch (action.type){
        case 'SET_DYNAMIC':
            var newState = Object.assign({}, state);
            newState[action.key] = {
            	weights: action.weight,
                buffer: action.buffer,
            	lat: action.lat,
            	lon: action.lng
            }
            return newState;
        default:
            return state;
    }
}

export default dynamic;