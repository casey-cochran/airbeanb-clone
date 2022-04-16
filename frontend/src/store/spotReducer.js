import { csrfFetch } from "./csrf";
import { useSelector } from "react-redux";
import { restoreUser } from "./session";





const CREATE_SPOT = 'user/CREATE_SPOT';
const SET_USER = 'session/SET_USER';
const USER_SPOTS = 'user/USER_SPOTS';
const DELETE_SPOT = 'user/DELETE_SPOT';
const UPDATE_SPOT = 'user/UPDATE_SPOT';
const FIND_SPOT = 'user/FIND_SPOT';
const LOAD_ALL_SPOTS = '/api/LOAD_ALL_SPOTS';
const ADD_IMAGE = '/spot/ADD_IMAGE';

//





// const DELETE_IMAGE = '/spot/DELETE_IMAGE';


// export const deleteImage = (imageId, spotId) => {
//     return ({
//         type: DELETE_IMAGE,
//         imageId,
//         spotId
//     })
// }

// export const deleteOneImage = (imageId, spotId, userId) => async dispatch => {
//     const response = await csrfFetch(`/api/users/${userId}/spots/${spotId}`,{
//         method: 'DELETE',
//         body: JSON.stringify({imageId})
//     })
//     const deletedImage = await response.json();
//     console.log(deletedImage, 'was it deleted')
//     dispatch(deleteImage(imageId, spotId))
// }


export const addImage = (image) => {
    return ({
        type: ADD_IMAGE,
        image
    })
}

export const loadImages = (imageData) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(imageData)
    })
    const image = await response.json();
    dispatch(addImage(image))
    return image;
}

export const updateSpot = (spotData) => {
    return ({
        type: UPDATE_SPOT,
        spotData,
    })
}

export const updateSingleSpot = (spotData) => async dispatch => {
    const response = await csrfFetch(`/api/users/${spotData.userId}/spots/${spotData.spotId}/edit`, {
        method: 'PATCH',
        body: JSON.stringify(spotData)
    })
    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot));
    return updatedSpot;
 }

export const findSpot = (singleSpot) => {
    return ({
        type: FIND_SPOT,
        singleSpot
    })
}

export const viewOneSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)
    const singleSpot = await response.json()
    dispatch(findSpot(singleSpot))
    return singleSpot
}

export const loadSingleSpot = (userId, spotId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/spots/${spotId}`);
    const spot = await response.json()
    dispatch(findSpot(spot))
    return spot;
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

export const loadSpots = (spots) => {
    return ({
        type: LOAD_ALL_SPOTS,
        spots
    })
}

export const loadAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const spots = await response.json();
    dispatch(loadSpots(spots))
    return spots;
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
    const {address, city, state, zipCode, country, bed, room, name, price, userId} = spotData;
    const response = await csrfFetch('/api/users/spots/new', {
        method: 'POST',
        body: JSON.stringify({
            address, city, name, state, zipCode, bed, room, country, price, userId
        })
    });
    const data = await response.json();
    dispatch(createSpot(data.spot))
    return data
}




const initialState = {user: null, spot: {}, images: {}, reviews: {}};

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
            newState.spot = {}
            if(action.data.spots){
            action.data.spots.forEach(space => newState.spot[space.id] = space)
            }
            return newState;
        case DELETE_SPOT:
            newState = {...state}
            if(newState.spot[action.spotId]){
                delete newState.spot[action.spotId]
            }
            return newState
        case FIND_SPOT:
            newState = {...state}
            newState.spot[action.singleSpot.id] = action.singleSpot
            return newState;
        case UPDATE_SPOT:
            newState = {...state}
            newState.spot[action.spotData.id] = action.spotData
            return newState;
        case LOAD_ALL_SPOTS:
            newState = {...state};
            action.spots.forEach(spot => newState.spot[spot.id] = spot)
            return newState;
        case ADD_IMAGE:
            newState = {...state}
            newState.spot[action.image.spotId].Images = [...newState.spot[action.image.spotId].Images];
            newState.spot[action.image.spotId].Images.push(action.image);
           return newState;
        // case LOAD_REVIEWS:
        //     newState ={...state}
        //     const data = action.reviews.reviews.Reviews
        //     console.log(data, ' data here ')
        //     data.forEach((review) => newState.reviews[review.id] = review)
        //     return newState;
           // newState
        // case DELETE_IMAGE:
        //     newState = {...state}
        //     //console.log(action.imageId)
        //     let imgArr = newState.spot[action.spotId].Images
        //     //console.log(imgArr, 'before loop splice')
        //     for(let i = 0; i < imgArr.length; i++){
        //         let imgobj = imgArr[i]
        //         if(imgobj.id === action.imageId){
        //             imgArr.splice(i, 1)
        //         }
        //     }
        //     //console.log(imgArr, 'state ?')
        //     //newState.spot[action.spotId].Images
        //     //return newState
        default:
            return state;
    }
}

export default spotReducer;
