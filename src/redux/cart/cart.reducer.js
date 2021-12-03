import { CartActionTypes } from "./cart.types";

const initialState = {
    hiddenCart: true
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hiddenCart: !state.hiddenCart
            }
    
        default:
            return state;
    }
}

export default cartReducer