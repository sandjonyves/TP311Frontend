import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    schools: [],
    loading: false,
    error: null,
};

const schoolSlice = createSlice({
    name: 'school',
    initialState,
    reducers: {
        fetchSchoolsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSchoolsSuccess: (state, action) => {
            state.loading = false;
            state.schools = action.payload;
        },
        fetchSchoolsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Ajoutez d'autres actions si nécessaire
    },
});

export const {
    fetchSchoolsStart,
    fetchSchoolsSuccess,
    fetchSchoolsFailure,
} = schoolSlice.actions;

export const selectSchools = (state) => state.school.schools;
export const selectLoading = (state) => state.school.loading;
export const selectError = (state) => state.school.error;

export default schoolSlice.reducer;