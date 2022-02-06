import { csrfFetch } from "./csrf";
import { useSelector } from "react-redux";





const CREATE_SPOT = 'user/CREATE_SPOT';
const SET_USER = 'session/SET_USER';
const USER_SPOTS = 'user/USER_SPOTS';


export const loadUserSpots = (data) => {
    return ({
        type: USER_SPOTS,
        data,
    })
}

export const fetchUserSpots = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/spots`);
    const data = await response.json();
    console.log(data, 'data inside fetch thunk?')
    dispatch(loadUserSpots(data));
    return response;
}





export const createSpot = (spotData) => {
    console.log(spotData, 'this is the spot data in the action creator')
    return ({
        type: CREATE_SPOT,
        spotData
    })
}

export const createUserSpot = (spotData) => async dispatch => {
    const {address, city, state, zipCode, country, name, price, userId} = spotData;

    const response = await csrfFetch('/api/users/spots/new', {
        method: 'POST',
        body: JSON.stringify({
            address, city, name, state, zipCode, country, price, userId
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
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case CREATE_SPOT:
            newState = {...state}
            newState.user['spot'] = action.spotData;
            return newState;
        case USER_SPOTS:
            newState = {...state}
            newState.user['spot'] = action.data.spots;
            return newState;
        default:
            return state;
    }
}

export default spotReducer;
