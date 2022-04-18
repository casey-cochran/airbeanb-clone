import { csrfFetch } from "./csrf";


const ADD_REVIEW = '/spot/ADD_REVIEW';
const LOAD_REVIEWS = '/spot/LOAD_REVIEWS';
const DELETE_REVIEW = '/spot/DELETE_REVIEW';
const EDIT_REVIEW = '/spot/EDIT_REVIEW';

export const editReview = (review) => {
    return ({
        type: EDIT_REVIEW,
        review
    })
}

export const editOneReivew = (review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${review.spotId}/review/${review.id}/edit`, {
        method: 'PATCH',
        body: JSON.stringify(
            review
        )
    })
    const editedReview = await response.json();
    if(response.ok){
        dispatch(editReview(editedReview))
    }
    return editedReview;
}

export const deleteReview = (reviewId) => {
    return ({
        type: DELETE_REVIEW,
        reviewId
    })
}

export const deleteOneReview = (review) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${review.spotId}/review/${review.id}/delete`, {
        method: 'DELETE'
    });
    const deleted = await response.json();
    dispatch(deleteReview(review.id))
}


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
        case DELETE_REVIEW:
            newState = {...state}
            delete newState.Reviews[action.reviewId]
            return newState;
        case EDIT_REVIEW:
            newState = {...state}
            newState.Reviews[action.review.id] = action.review;
            return newState;
        default:
            return state;
    }
}


export default reviewsReducer;
