import { csrfFetch } from "./csrf";
import { useSelector } from "react-redux";
import { restoreUser } from "./session";





const CREATE_SPOT = 'user/CREATE_SPOT';
const SET_USER = 'session/SET_USER';
const USER_SPOTS = 'user/USER_SPOTS';
const DELETE_SPOT = 'user/DELETE_SPOT';
const UPDATE_SPOT = 'user/UPDATE_SPOT';
const FIND_SPOT = 'user/FIND_SPOT'

export const updateSpot = (spotData) => {
    return ({
        type: UPDATE_SPOT,
        spotData,
    })
}

export const updateSingleSpot = (spotData) => async dispatch => {
    const response = await csrfFetch(`/api/users/${spotData.userId}/spots/${spotData.spotId}/edit`, {
        method: 'PUT',
        body: JSON.stringify(spotData)
    })
    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot));
    return response;
 }

export const findSpot = (singleSpot) => {
    return ({
        type: FIND_SPOT,
        singleSpot
    })
}

export const loadSingleSpot = (userId, spotId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/spots/${spotId}/edit`);
    const spot = await response.json()
    console.log(spot)
    dispatch(findSpot(spot))
    return response;
}


export const deleteSpot = (userId, spotId) => {
    return ({
        type:DELETE_SPOT,
        userId,
        spotId
    })
}

export const removeSpot = (userId, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/spots/delete`, {
        method: 'DELETE',
        body: JSON.stringify({
            userId,
            spotId
        })
    })
    const data = await response.json();
    dispatch(deleteSpot(userId, spotId))
}


export const loadUserSpots = (data) => {
    return ({
        type: USER_SPOTS,
        data,
    })
}

export const fetchUserSpots = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/spots`);
    const data = await response.json();
    dispatch(loadUserSpots(data));
    return response;
}

export const createSpot = (spotData) => {
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




const initialState = {user: null, spot: {}};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case CREATE_SPOT:
            newState = {...state}
            newState.spot = {[action.spotData.id]: {id: action.spotData }}
            return newState;
        case USER_SPOTS:
            newState = {...state}
            action.data.spots.forEach(space => newState.spot[space.id] = space)
            return newState;
        case DELETE_SPOT:
            newState = {...state}
            if(newState.spot[action.spotId]){
                delete newState.spot[action.spotId]
            }
            return newState
        case FIND_SPOT:
            newState = {...state}
            console.log(action.singleSpot)
            newState.spot[action.singleSpot.id] = action.singleSpot;
            return newState;
        case UPDATE_SPOT:
            newState = {...state}
            newState.spot[action.spotData.id] = action.spotData
        default:
            return state;
    }
}

export default spotReducer;
