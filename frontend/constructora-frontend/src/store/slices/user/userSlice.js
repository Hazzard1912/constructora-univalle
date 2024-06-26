import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'checking',
        uid: null,
        email: null,
        role: null,
        displayName: null,
        errorMessage: null
    },
    reducers: {
        loginStart: (state) => {
            state.status = 'loading';
            state.errorMessage = null;
        },
        loginSuccess: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.role = payload.role;
            state.displayName = payload.displayName;
            state.errorMessage = null;
        },
        loginFailure: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.errorMessage = payload.errorMessage;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.role = null;
            state.displayName = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, checkingCredentials } = userSlice.actions;

export default userSlice.reducer;
