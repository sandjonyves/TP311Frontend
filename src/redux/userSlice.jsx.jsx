// # +====================================================================================+ #
// # |===============================     Powerk-soft     ================================| #
// # |==============================    e-commerce app     ===============================| #
// # |======================= Programmer: Sandjon Yves =======================| #
// # +====================================================================================+ #

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    client : null,
    // products : null,
    // quantity:0,
    // price:0
};

export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        setClient: (state, action) => void(state.client = action.payload),
        // setProducts: (state, action) => void(state.products = action.payload),
        // setQuantity: (state, action) => void(state.quantity = action.payload),
        // setPrice: (state, action) => void(state.price = action.payload),
    },
});

export const { setClient} = clientSlice.actions;
export default clientSlice.reducer; 