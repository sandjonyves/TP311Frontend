import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    prototypes: [],
    setPrototype : {},
    loading: false,
    error: null,
};

const prototypeSlice = createSlice({
    name: 'prototype',
    initialState,
    reducers: {
        setPrototype: (state,action) => {
            state.setPrototype = action.payload;
        },
        fetchPrototypeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPrototypeSuccess: (state, action) => {
            state.loading = false;
            state.prototype = action.payload;
        },
        fetchPrototypeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Ajoutez d'autres actions si nécessaire
    },
});

export const {
    setPrototype,
    fetchPrototypeStart,
    fetchPrototypeSuccess,
    fetchPrototypeFailure,
} = prototypeSlice.actions;

export const selectprototype = (state) => state.prototype.prototype;
export const selectLoading = (state) => state.prototype.loading;
export const selectError = (state) => state.prototype.error;

export default prototypeSlice.reducer;