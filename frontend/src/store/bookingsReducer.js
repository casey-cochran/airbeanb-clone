import { csrfFetch } from "./csrf";



const SET_USER = 'session/SET_USER';
const BOOK_SPOT = '/spots/BOOK_SPOT';
const LOAD_BOOKINGS = '/spots/LOAD_BOOKINGS';
const CANCEL_BOOKING = '/spots/CANCEL_BOOKING';

export const cancel = (bookingId) => {
    return ({
        type: CANCEL_BOOKING,
        bookingId
    })
}

export const cancelBooking = (bookingId, userId) => async dispatch => {

    const response = await csrfFetch(`/api/users/${userId}/bookings/${bookingId}`,{
        method: 'DELETE'
    });
    const deleted = await response.json();
    if(deleted) dispatch(cancel(bookingId))
    return response;
}

export const viewBookings = (bookings) => {
    return ({
        type: LOAD_BOOKINGS,
        bookings
    })
}

export const loadBooking = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/bookings`)
    const bookings = await response.json();
    dispatch(viewBookings(bookings))
    return bookings;
}

export const bookSpot = (newBooking) => {
    return ({
        type: BOOK_SPOT,
        newBooking
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
    const newBooking = await response.json();
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
        case LOAD_BOOKINGS:
            newState = {...state};
            action.bookings.forEach(booking => newState.booking[booking.id] = booking)
            return newState;
        case CANCEL_BOOKING:
            newState = {...state};
            delete newState.booking[action.bookingId]
            return newState;
        default:
            return state;
    }
}


export default bookingsReducer;
