import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    student: [],
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        fetchStudentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchStudentSuccess: (state, action) => {
            state.loading = false;
            state.student = action.payload;
        },
        fetchStudentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Ajoutez d'autres actions si nécessaire
    },
});

export const {
    fetchStudentStart,
    fetchStudentSuccess,
    fetchStudentFailure,
} = studentSlice.actions;

export const selectstudent = (state) => state.student.student;
export const selectLoading = (state) => state.student.loading;
export const selectError = (state) => state.student.error;

export default studentSlice.reducer;