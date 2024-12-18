import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    assignment : null,
    agency :null
};

export const assignmentSlice = createSlice({
    name: "assignment",
    initialState,
    reducers: {
        assignmentReducer: (state, action) => void(state.assignment = action.payload),
        agencyReducer : (state,action) => void(state.agency = action.payload)
    },
    
});

export const { assignmentReducer,agencyReducer } = assignmentSlice.actions;
export default assignmentSlice.reducer; 