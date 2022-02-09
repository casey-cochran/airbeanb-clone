import { csrfFetch } from "./csrf";



const SET_USER = 'session/SET_USER';
const BOOK_SPOT = '/spots/BOOK_SPOT';
const LOAD_BOOKINGS = '/spots/LOAD_BOOKINGS';

export const viewBookings = () => {
    return ({
        type: LOAD_BOOKINGS,

    })
}

export const loadBooking = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/bookings`)
    const bookings = await response.json();
    console.log('what is bookings', bookings)
}

export const bookSpot = (newBooking) => {
    return ({
        type: BOOK_SPOT,
        newBooking
    })
}

export const bookOneSpot = (booking) => async dispatch => {
    const {startDate, endDate, userId, spotId} = booking
    console.log(startDate, 'startdate in reducer thunk')
    const response = await csrfFetch(`/api/spots/${booking.spotId}`, {
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate,
            userId,
            spotId
        })
    })
    const newBooking = await response.json();
    console.log('waht is the', newBooking)
    dispatch(bookSpot(newBooking))
    return newBooking;
}


const initialState = {user: null, spot: {}, booking: {}};

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case BOOK_SPOT:
            newState = {...state};
            newState.booking[action.newBooking.id] = action.newBooking;
            return newState;

        default:
            return state;
    }
}


export default bookingsReducer;
