import { UserActionTypes } from "./user.types";

const initialState = {
    currentUser: null
}

// es6 default value
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;