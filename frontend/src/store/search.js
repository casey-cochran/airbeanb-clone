import { csrfFetch } from "./csrf";


const SEARCH_SPOTS = 'SEARCH_SPOTS';

export const search = (data) => {
    return ({
        type: SEARCH_SPOTS,
        data
    })
}

export const searchSpots = (searchValue) => async dispatch => {
    const response = await csrfFetch('/api/search', {
        method: 'POST',
        body: JSON.stringify(
            {searchValue}
        )
    })
    const data = await response.json();
    dispatch(search(data))
}

const initialState = { Search: {} }

const searchReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SEARCH_SPOTS:
            newState = {...state}
            // const searchArr = Object.values(action.data)
            // searchArr.forEach((ele) => newState.Search[ele.id] = ele)
            newState.Search = action.data
            return newState;
        default:
            return state;
    }
}

export default searchReducer;
