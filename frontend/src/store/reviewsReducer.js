import { csrfFetch } from "./csrf";


const ADD_REVIEW = '/spot/ADD_REVIEW';
const LOAD_REVIEWS = '/spot/LOAD_REVIEWS';


export const loadReviews = (reviews) => {
    return ({
        type: LOAD_REVIEWS,
        reviews
    })
}

export const loadSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/review`)
    const allReviews = await response.json();
     dispatch(loadReviews(allReviews))
    return allReviews
}


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
            newState.Reviews[action.review.id] = action.review;
            return newState;
        case LOAD_REVIEWS:
            newState = {...state}
            action.reviews.Reviews.forEach((review) => {
                newState.Reviews[review.id] = review
            })
            return newState;
        default:
            return state;
    }
}


export default reviewsReducer;
