import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART
} from '.././components/CartAction/cartAction';

const initialState = {
    items: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter((_, index) => index !== action.payload)
            };
        case UPDATE_CART_ITEM_QUANTITY:
            return {
                ...state,
                items: state.items.map((item, index) =>
                    index === action.payload.index
                        ? { ...item, quantity: action.payload.newQuantity }
                        : item
                )
            };
        case CLEAR_CART:
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
};

export default cartReducer;
