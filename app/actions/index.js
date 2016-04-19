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

export const setDynamic = (key, weight, buffer, lat, lng) =>{
	return {
		type: 'SET_DYNAMIC',
		key: key,
		weight: weight,
		buffer: buffer,
		lat: lat,
		lng: lng
	}
}