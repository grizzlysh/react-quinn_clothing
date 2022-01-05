import UserActionTypes from "./user.types";

const initialState = {
    currentUser: null,
    errorMessage: null
}

// es6 default value
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // case UserActionTypes.SET_CURRENT_USER:
        //     return {
        //         ...state,
        //         currentUser: action.payload
        //     }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                errorMessage: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                errorMessage: null
            }
        default:
            return state;
    }
}

export default userReducer;