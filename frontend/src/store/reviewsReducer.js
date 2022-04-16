import { csrfFetch } from "./csrf";


const ADD_REVIEW = '/spot/ADD_REVIEW';


export const add_Review = (review) => {
    return ({
        type: ADD_REVIEW,
        review
    })
}

export const addReview = (reviewData) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${reviewData.spotId}/review`, {
        method: 'POST',
        body: JSON.stringify(reviewData)
    })
    const review = await response.json();
    dispatch(add_Review(review))
    return review;
}





const initialState = {Reviews: {}}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case ADD_REVIEW:
            newState = {...state}
            newState.Reviews[action.review.id] = action.review
        default:
            return state;
    }
}


export default reviewsReducer;
