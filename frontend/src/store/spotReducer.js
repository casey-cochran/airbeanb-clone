import { csrfFetch } from "./csrf";



const CREATE_SPOT = 'user/CREATE_SPOT'


export const createSpot = (spotData) => {
    return ({
        type: CREATE_SPOT,
        spotData
    })
}

export const createUserSpot = (spotData) => async dispatch => {
    const {address, city, state, zipCode, country, name, price} = spotData;
    const response = await csrfFetch('/api/users/spots/new', {
        method: 'POST',
        body: JSON.stringify({
            address, city, name, state, zipCode, country, price
        })
    });
    const data = await response.json();
    dispatch(createSpot(data.spot))
    return response;
}




const initialState = {user: null};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case CREATE_SPOT:
            newState = {...state}
            newState.user[action.spotData.id] = action.spotData;
            return newState;
        default:
            return state;
    }
}

export default spotReducer;
