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