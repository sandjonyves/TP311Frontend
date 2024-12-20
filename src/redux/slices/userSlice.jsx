// src/features/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token :'',
        id:'',
        username: '',
        email: '',
        password: '',
    },
    reducers: {
        setUser: (state, action) => {
            const {token,id, username, email, password } = action.payload;
            state.token=token;
            state.id=id;
            state.username = username;
            state.email = email;
            state.password = password;
        },
        clearUser: (state) => {
            state.token='';
            state.id='';
            state.username = '';
            state.email = '';
            state.password = '';
        },
    },
});

// Exporting actions
export const { setUser, clearUser } = userSlice.actions;

// Exporting reducer
export default userSlice.reducer;