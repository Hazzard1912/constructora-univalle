import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user/userSlice";

const preloadedState = localStorage.getItem('user') ? { user: JSON.parse(localStorage.getItem('user')) } : {};

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
    preloadedState,
});

store.subscribe(() => {
    localStorage.setItem('user', JSON.stringify(store.getState().user));
    }
);
