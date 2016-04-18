export const setProfile = (index) => {
    return {
        type: 'SET_PROFILE',
        profile: index
    };
}

export const setWeight = (key, weight) => {
	return {
		type: 'SET_WEIGHT',
		key: key,
		weight: weight
	}
}

export const waiting = (value) =>{
	return {
		type: 'WAITING',
		value: value
	}
}