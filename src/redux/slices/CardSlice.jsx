import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards : null
};

export const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        fetchCard: (state, action) => void(state.cards = action.payload)
    },
});

export const { fetchCard} = cardSlice.actions;
export default cardSlice.reducer; 