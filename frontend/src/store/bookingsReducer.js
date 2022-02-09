import { csrfFetch } from "./csrf";



const SET_USER = 'session/SET_USER';
const BOOK_SPOT = '/spots/BOOK_SPOT';

export const bookSpot = (userId, spotId) => {
    return ({
        type: BOOK_SPOT,
        userId,
        spotId
    })
}

export const bookOneSpot = (booking) => async dispatch => {
    const {startDate, endDate, userId, spotId} = booking
    const response = await csrfFetch(`/api/spots/${booking.spotId}`, {
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate,
            userId,
            spotId
        })
    })
    const success = await response.json();
    console.log(success, ' did it work booking?')
}


const initialState = {user: null, spot: {}, images: {}};

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
}


export default bookingsReducer;
