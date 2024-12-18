import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    class: [],
    loading: false,
    error: null,
};

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        fetchClassStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchClassSuccess: (state, action) => {
            state.loading = false;
            state.class = action.payload;
        },
        fetchClassFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Ajoutez d'autres actions si nécessaire
    },
});

export const {
    fetchClassStart,
    fetchClassSuccess,
    fetchClassFailure,
} = classSlice.actions;

export const selectClass = (state) => state.class.class;
export const selectLoading = (state) => state.class.loading;
export const selectError = (state) => state.class.error;

export default classSlice.reducer;