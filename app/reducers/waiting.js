const waiting = (state = false, action) => {
    switch (action.type){
        case 'WAITING':
            return action.value;
        default:
            return state;
    }
}

export default waiting;