import { AUTHORIZED } from '../actions/actionTypes';

const initialState = {
    authorized: false 
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTHORIZED:
            return {
                ...state,
                authorized: action.authorized
            }
        default:
            return state;
    }
}

export default reducer;